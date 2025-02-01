import { Video } from "../db/db.js";

export const getAllVideos = async (req, res) => {
    const { youtuberId } = req.youtuber;

    try {
        const video = await Video.find({ youtuber: youtuberId }).sort({ createdAt: -1 });

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }

        res.status(200).json({
            success: true,
            video
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const getRecentVideos = async (req, res) => {
    const { youtuberId } = req.youtuber;

    try {
        const video = await Video.find({ youtuber: youtuberId, status: "PENDING" }).sort({ createdAt: -1 });

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'No Recent videos found'
            })
        }

        res.status(200).json({
            success: true,
            video
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const getApprovedVideos = async (req, res) => {
    const { youtuberId } = req.youtuber;

    try {

        const video = await Video.find({ youtuber: youtuberId, status: 'APPROVED' }).sort({ createdAt: -1 });

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'No Approved video found'
            })
        }

        res.status(200).json({
            success: true,
            video
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const getRejectedVideos = async (req, res) => {

    const { youtuberId } = req.youtuber;

    try {
        const video = await Video.find({ youtuber: youtuberId, status: 'REJECTED' }).sort({ createdAt: -1 });

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }

        res.status(200).json({
            success: true,
            video
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const updateVideo = async (req, res) => {
    const { videoId } = req.params;
    const { editorId } = req.youtuber;
    const { title, description, tags } = req.body;

    try {
        const video = await Video.findById(videoId)

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }

        if (video.youtuber.toString() !== youtuberId) {
            return res.status(409).json({
                success: false,
                message: 'You are not Authorized'
            })
        }

        const updatedVideo = await Video.findByIdAndUpdate(videoId, {
            title,
            description,
            tags
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Video Updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const confirmVideo = async (req, res) => {
    const { youtuberId } = req.youtuber;
    const { videoId } = req.params;

    try {
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'No video Found'
            })
        }

        if (video.youtuber.toString() !== youtuberId) {
            return res.status(409).json({
                success: false,
                message: 'You are not authorized'
            })
        }
        await Video.findByIdAndUpdate(videoId, {
            success: "APPROVED"
        })

        res.status(200).json({
            success: true,
            message: 'Video Confirmed, Uploading to YouTube'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}