import { google } from "googleapis";
import { Video, YoutubeChannel } from "../db/db.js";
import fs from 'fs';
import dotenv from 'dotenv'
import multer from 'multer'
import { downloadVideoFromS3 } from "./awsController.js";

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
        // if(oauth2Client.isTokenExpiring()) {
        //     const { credentials } = await oauth2Client.refreshAccessToken();
        //     oauth2Client.setCredentials(credentials);
        //     youtuber.accessToken = credentials.access_token;
        //     await youtuber.save();
        // }

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