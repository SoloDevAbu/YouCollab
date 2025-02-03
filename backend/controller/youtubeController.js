import { google } from "googleapis";
import { YoutubeChannel } from "../db/db.js";
import fs from 'fs';
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config();


const upload = multer({ dest: 'uploads/' }).single('video')

export const getChannelInfo = async (req, res) => {
    const { youtuberId } = req.youtuber

    try {
        const youtuber = await YoutubeChannel.findOne({youtuberId})

        if (!youtuber) {
            return res.status(404).json({
                success: false,
                message: 'Youtube channel not linked'
            })
        }

        res.status(200).json({
            youtuber
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const uploadVideoToYoutube = async (req, res) => {

    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }
        })

        const { title, description, tags } = req.body;
        const videoPath = req.file.path;
        const { userId } = req.user;

        const youtuber = await YoutubeChannel.findOne({userId})

        if (!youtuber) {
            return res.status(404).json({
                success: false,
                message: 'Youtube channel not linked'
            })
        }

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({access_token: youtuber.accessToken});

        const youtube = google.youtube({version: 'v3', auth: oauth2Client});

        const response = await youtube.videos.insert({
            part: 'snippet, status',
            requestBody: {
                snippet: {
                    title,
                    description,
                    tags
                },
                status: {
                    privacyStatus: 'public'
                }
            },
            media: {
                body: fs.createReadStream(videoPath)
            }
        })

        fs.unlinkSync(videoPath);

        res.json({
            success: true,
            message: 'Video uploaded successfully',
            videoId: response.data.id
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}