import { Router } from 'express';
import { editorMiddleware } from '../middleware/editor.middleware';
import {
  uploadVideo,
  getVideos,
  editVideo,
  deleteVideo,
  approvedVideos,
  rejectedVideos,
  pendingVideos,
  getVideoById,
  updateVideoStatus
} from '../controllers/editorUploadVideoController';

const router = Router();

// Editor video routes
router.post('/upload', editorMiddleware, uploadVideo);
router.get('/all', editorMiddleware, getVideos);
router.get('/approved', editorMiddleware, approvedVideos);
router.get('/rejected', editorMiddleware, rejectedVideos);
router.get('/pending', editorMiddleware, pendingVideos);
router.get('/:videoId', editorMiddleware, getVideoById);
router.put('/:videoId', editorMiddleware, editVideo);
router.put('/:videoId/status', editorMiddleware, updateVideoStatus);
router.delete('/:videoId', editorMiddleware, deleteVideo);

export default router;
