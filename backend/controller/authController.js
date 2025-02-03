import { google } from "googleapis";
import oauth2Client from "../config/youtubeConfig.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { YoutubeChannel } from "../db/db.js";

dotenv.config()

const SCOPES = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.upload',
];

export const googleAuth = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });

    res.redirect(authUrl);
}

export const googleAuthCallback = async (req, res) => {
    const { code } = req.query;
    const { youtuberId } = req.youtuber;

    try {
        if (!code) {
            return res.status(400).json({
                error: 'Authorization code is missing'
            });
        }
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens)

        const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

        const channelResponse = await youtube.channels.list({
            part: 'snippet,contentDetails,statistics',
            mine: true
        })

        if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
            return res.status(404).json({ error: "No YouTube channel found" });
        }

        const channel = channelResponse.data.items[0];
        const channelData = {
            channelId: channel.id,
            channelName: channel.snippet.title,
            profileImage: channel.snippet.thumbnails.default.url,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token
        };

        await YoutubeChannel.create({
            youtuberId: youtuberId,
            channelName: channelName,
            profileUrl: profileImage,
            accessToken,
            refreshToken
        })

        const token = jwt.sign(channelData, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.cookie('youtubeAuth', token, {
            httpOnly: true
        }).redirect(process.env.CLIENT_URL)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}