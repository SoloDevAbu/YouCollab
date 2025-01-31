import { Editor, Video } from "../db/db.js";

export const uploadVideo = async (req, res) => {
    const {editorId} = req.editor;
    const {title, description, tags} = req.body;

    try {
        const editor = await Editor.findById(editorId);

        if(!editor) {
            return res.status(404).json({
                success: false,
                message: 'Editor not found'
            })
        }

        const video = await Video.create({
            title,
            description,
            tags,
            editor: editorId
        })

        res.status(201).json({
            success: true,
            message: 'Video Uploaded Successfully',
            videoId: video._id
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const editVideo = async(req, res) => {
    const {videoId} = req.params;
    const {editorId} = req.editor;
    const {title, description, tags} = req.body;

    try {
        const video = await Video.findById(videoId);
        if(!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            })
        }

        if(videoId !== video._id || video.editor._id !== editorId) {
            return res.status(409).json({
                success: false,
                message: 'You are not authorized'
            })
        }

        const updatedVideo = await Video.findByIdAndUpdate(videoId, {
            title,
            description,
            tags
        }, {new: true})

        res.status(200).json({
            success: true,
            message: 'Video updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const deleteVideo = async(req, res) => {
    const {videoId} = req.params;
    const {editorId} = req.editor;

    try {
        const video = await Video.findById(videoId);

        if(!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }

        if(videoId !== video._id || video.editor._id !== editorId) {
            return res.status(409).json({
                success: false,
                message: 'You are not authorized'
            })
        }

        await Video.findByIdAndDelete(videoId);

        res.status(200).json({
            success: true,
            message: 'Video deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}