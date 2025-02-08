import { Editor, Video, Youtuber } from "../db/db.js";
import { getAwsPresignedUrlForShowVideo, getAwsPresignedUrlForUpload } from "./awsController.js";

export const uploadVideo = async (req, res) => {
    const {editorId} = req.editor;
    const {fileName, title, description, tags} = req.body;

    try {
        const editor = await Editor.findById(editorId);

        if(!editor) {
            return res.status(404).json({
                success: false,
                message: 'Editor not found'
            })
        }

        if(editor.youtuber === null){
            return res.json({
                success: false,
                message: 'You are not Added by any youtuber'
            })
        }

        const video = await Video.create({
            fileName,
            title,
            description,
            tags,
            editor: editorId,
            youtuber: editor.youtuber
        })

        await Youtuber.findByIdAndUpdate(editor.youtuber, 
            {$addToSet: {videos: video._id}}
        )

        await Editor.findByIdAndUpdate(editorId,
            {$addToSet: {videos: video._id}}
        )

        const uploadPresignedUrl = await getAwsPresignedUrlForUpload(fileName, 'video/mp4');
    

        res.status(201).json({
            success: true,
            uploadPresignedUrl,
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

        if(video.editor.toString() !== editorId) {
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
        const editor = await Editor.findById(editorId);

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

        if(video.status !== 'PENDING') {
            return res.json({
                success: false,
                message: 'Can not delete video'
            })
        }

        await Editor.findByIdAndUpdate(editorId, 
            {$pull : {videos: videoId}},
            {new: true}
        )

        await Youtuber.findByIdAndUpdate(editor.youtuber, 
            {$pull: {videos: videoId}}
        );

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

export const getVideos = async (req, res) => {
    const {editorId} = req.editor;

    try {
        const video = await Video.find({editor: editorId}).sort({createdAt: -1});

        if(!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }
        const videosWithPresignedUrls = await Promise.all(video.map(async (vid) => {
            const presignedUrl = await getAwsPresignedUrlForShowVideo(vid.fileName);
            return {
                ...vid.toObject(),
                presignedUrl
            };
        }));
        
        res.status(200).json({
            success: true,
            videos: videosWithPresignedUrls
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}


export const approvedVideos = async (req, res) => {
    const {editorId} = req.editor;

    try {
        const video = await Video.find({editor: editorId, status: 'APPROVED'}).sort({createdAt: -1});

        if(!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }
        
        res.status(200).json({
            success: true,
            videos: video
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const rejectedVideos = async (req, res) => {
    const {editorId} = req.editor;

    try {
        const video = await Video.find({editor: editorId, status: 'REJECTED'}).sort({createdAt: -1});

        if(!video) {
            return res.status(404).json({
                success: false,
                message: 'No video found'
            })
        }
        
        res.status(200).json({
            success: true,
            videos: video
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}