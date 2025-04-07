import { Router } from 'express';
import { 
  approvedVideos, 
  deleteVideo, 
  editVideo, 
  getVideos, 
  rejectedVideos, 
  uploadVideo 
} from '../controllers/editorUploadVideoController';
import { editorMiddleware } from '../middleware/editor.middleware';
import { youtuberMiddleware } from '../middleware/youtuber.middleware';
import { 
  confirmVideo, 
  getAllVideos, 
  getApprovedVideos, 
  getRecentVideos, 
  getRejectedVideos, 
  rejectVideo, 
  updateVideo 
} from '../controllers/youtuberVideoController';

const router = Router();

router.post('/editor/upload', editorMiddleware, uploadVideo);
router.put('/editor/edit/:videoId', editorMiddleware, editVideo);
router.delete('/editor/delete/:videoId', editorMiddleware, deleteVideo);
router.get('/editor/videos', editorMiddleware, getVideos);
router.get('/editor/approved-videos', editorMiddleware, approvedVideos);
router.get('/editor/rejected-videos', editorMiddleware, rejectedVideos);

router.get('/youtuber/all-videos', youtuberMiddleware, getAllVideos);
router.get('/youtuber/recent-videos', youtuberMiddleware, getRecentVideos);
router.get('/youtuber/approved-videos', youtuberMiddleware, getApprovedVideos);
router.get('/youtuber/rejected-videos', youtuberMiddleware, getRejectedVideos);
router.put('/youtuber/confirm/:videoId', youtuberMiddleware, confirmVideo);
router.put('/youtuber/reject/:videoId', youtuberMiddleware, rejectVideo);
router.put('/youtuber/update/:videoId', youtuberMiddleware, updateVideo);

export default router;
