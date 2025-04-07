import { Response } from 'express';
import { YoutuberRequest } from '../types';
import Video from '../models/video.model';

export const getAllVideos = async (req: YoutuberRequest, res: Response) => {
  try {
    const videos = await Video.find({ youtuber: req.youtuber?.id })
      .populate('editor', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      videos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching videos'
    });
  }
};

export const getRecentVideos = async (req: YoutuberRequest, res: Response) => {
  try {
    const videos = await Video.find({ youtuber: req.youtuber?.id })
      .populate('editor', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      videos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching recent videos'
    });
  }
};

export const confirmVideo = async (req: YoutuberRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findOneAndUpdate(
      { _id: videoId, youtuber: req.youtuber?.id },
      { status: 'approved' },
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
      message: 'Error confirming video'
    });
  }
};

export const rejectVideo = async (req: YoutuberRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const { reason } = req.body;

    const video = await Video.findOneAndUpdate(
      { _id: videoId, youtuber: req.youtuber?.id },
      { 
        status: 'rejected',
        rejectionReason: reason 
      },
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
      message: 'Error rejecting video'
    });
  }
};
