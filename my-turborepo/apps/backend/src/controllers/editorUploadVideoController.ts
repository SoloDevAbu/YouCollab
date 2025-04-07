import { Response } from 'express';
import { EditorRequest } from '../types';
import Video from '../models/video.model';

export const uploadVideo = async (req: EditorRequest, res: Response) => {
  try {
    const { title, description, thumbnail, videoUrl, youtuberId } = req.body;

    const video = await Video.create({
      title,
      description,
      thumbnail,
      videoUrl,
      editor: req.editor?.id,
      youtuber: youtuberId,
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      video
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error uploading video'
    });
  }
};

export const getVideos = async (
  req: EditorRequest, 
  res: Response
): Promise<Response> => {
  try {
    const videos = await Video.find({ editor: req.editor?.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: videos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching videos'
    });
  }
};

export const editVideo = async (req: EditorRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const { title, description, tags } = req.body;

    const video = await Video.findOneAndUpdate(
      { _id: videoId, editor: req.editor?.id },
      { title, description, tags },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    return res.status(200).json({
      success: true,
      video
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating video'
    });
  }
};

export const deleteVideo = async (req: EditorRequest, res: Response) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findOneAndDelete({
      _id: videoId,
      editor: req.editor?.id
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting video'
    });
  }
};

export const approvedVideos = async (req: EditorRequest, res: Response): Promise<Response> => {
  try {
    const videos = await Video.find({ 
      editor: req.editor?.id,
      status: 'approved' 
    })
    .sort({ createdAt: -1 })
    .populate('youtuber', 'name email');

    return res.status(200).json({
      success: true,
      videos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching approved videos'
    });
  }
};

export const rejectedVideos = async (req: EditorRequest, res: Response): Promise<Response> => {
  try {
    const videos = await Video.find({ 
      editor: req.editor?.id,
      status: 'rejected' 
    })
    .sort({ createdAt: -1 })
    .populate('youtuber', 'name email');

    return res.status(200).json({
      success: true,
      videos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching rejected videos'
    });
  }
};

export const pendingVideos = async (req: EditorRequest, res: Response): Promise<Response> => {
  try {
    const videos = await Video.find({ 
      editor: req.editor?.id,
      status: 'pending' 
    })
    .sort({ createdAt: -1 })
    .populate('youtuber', 'name email');

    return res.status(200).json({
      success: true,
      videos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching pending videos'
    });
  }
};

export const getVideoById = async (req: EditorRequest, res: Response): Promise<Response> => {
  try {
    const { videoId } = req.params;
    const video = await Video.findOne({
      _id: videoId,
      editor: req.editor?.id
    }).populate('youtuber', 'name email');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    return res.status(200).json({
      success: true,
      video
    });
  } catch (error) {
    return res.status(500).json({
      success: false, 
      message: 'Error fetching video'
    });
  }
};

export const updateVideoStatus = async (req: EditorRequest, res: Response): Promise<Response> => {
  try {
    const { videoId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updateData: { status: string; rejectionReason?: string } = { status };
    
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const video = await Video.findOneAndUpdate(
      { _id: videoId, editor: req.editor?.id },
      updateData,
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    return res.status(200).json({
      success: true,
      video
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating video status'
    });
  }
};
