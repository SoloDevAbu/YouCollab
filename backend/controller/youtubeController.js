import { google } from "googleapis";
import { Video, YoutubeChannel } from "../db/db.js";
import fs from 'fs';
import dotenv from 'dotenv'
import multer from 'multer'
import { downloadVideoFromS3 } from "./awsController.js";
import oauth2Client from "../config/youtubeConfig.js";
import path from "path";

dotenv.config();

const allowedMimeTypes = [
    "video/quicktime",
    "video/mpeg",
    "video/mp4",
    "video/x-msvideo",
    "video/x-ms-wmv",
    "video/x-flv",
    "video/mpg",
    "video/mpegps",
    "video/3gpp", 
    "video/webm",
    "video/x-dnxhr",
    "video/quicktime",
    "video/x-cineform",
    "video/hevc",
    "video/h265"
];

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype.toLowerCase();

    if (allowedMimeTypes.includes(mimetype)) {
        return cb(null, true);
    } else {
        cb(new Error('Only specified video file types are allowed!'));
    }
};

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: fileFilter
}).single('video');

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

        const youtube = google.youtube({ version: "v3", auth: oauth2Client });

        const channelResponse = await youtube.channels.list({
            part: "snippet,statistics,brandingSettings",
            mine: true,
        });

        if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
            return res.status(404).json({ error: "No YouTube channel found" });
        }

        const channel = channelResponse.data.items[0];

        const channelData = {
            youtuberId: youtuberId,
            channelName: channel.snippet.title,
            channelUserName: channel.snippet.customUrl || channel.snippet.localized.title,
            subscriberCount: parseInt(channel.statistics.subscriberCount, 10) || 0,
            videoCount: parseInt(channel.statistics.videoCount, 10) || 0,
            bannerUrl: channel.brandingSettings.image?.bannerExternalUrl || "",
            profileUrl: channel.snippet.thumbnails?.high?.url || "",
        };

        await YoutubeChannel.findByIdAndUpdate(youtuber._id, channelData);


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
        const {videoId} = req.params;
        const { youtuberId } = req.user;

        const youtuber = await YoutubeChannel.findOne({youtuberId})

        if (!youtuber) {
            return res.status(404).json({
                success: false,
                message: 'Youtube channel not linked'
            })
        }

        const video = await Video.findById(videoId);

        if(!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }

        if (video.youtuber.toString() !== youtuber.youtuberId.toString()) {
            return res.status(409).json({
                success: false,
                message: 'You are not authorized'
            })
        }

        const {fileName, title, description, tags} = video;

        const videoPath = await downloadVideoFromS3(fileName);

        if (!fs.existsSync(videoPath)) {
            console.error("Downloaded file does not exist:", videoPath);
            return res.status(500).json({ success: false, error: "Downloaded file is missing" });
        }

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({access_token: youtuber.accessToken});
        
        const youtube = google.youtube({version: 'v3', auth: oauth2Client});

        let response;
        let attempts = 0;
        const maxAttempts = 3;
        while (attempts < maxAttempts) {
            try {
                response = await youtube.videos.insert({
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
                    },
                    uploadType: 'multipart'
                });
                break;
            } catch (error) {
                attempts++;
                if (attempts >= maxAttempts) {
                    throw error;
                }
                console.error(`Attempt ${attempts} failed: ${error.message}`);
            }
        }

        fs.unlinkSync(videoPath);

        res.json({
            success: true,
            message: 'Video uploaded successfully'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}