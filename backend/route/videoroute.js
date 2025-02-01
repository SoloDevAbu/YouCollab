import {Router} from 'express';
import { approvedVideos, deleteVideo, editVideo, getVideos, rejectedVideos, uploadVideo } from '../controller/editorUploadVideoController.js';
import { editorMiddleware } from '../middleware/editor.mddleware.js';
import { youtuberMiddleware } from '../middleware/youtuber.middleware.js';
import { confirmVideo, getAllVideos, getApprovedVideos, getRecentVideos, getRejectedVideos, updateVideo } from '../controller/youtuberVideoController.js';

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
router.put('/youtuber/edit/:videoId', youtuberMiddleware, updateVideo);
router.put('/youtuber/approve/:videoId', youtuberMiddleware, confirmVideo);

export default router;