import {Router} from 'express';
import { approvedVideos, deleteVideo, editVideo, getVideos, rejectedVideos, uploadVideo } from '../controller/editorUploadVideoController.js';
import { editorMiddleware } from '../middleware/editor.mddleware.js';

const router = Router();

router.post('/editor/upload', editorMiddleware, uploadVideo);
router.put('/editor/edit/:videoId', editorMiddleware, editVideo);
router.delete('/editor/delete/:videoId', editorMiddleware, deleteVideo);
router.get('/editor/videos', editorMiddleware, getVideos);
router.get('/editor/approved-videos', editorMiddleware, approvedVideos);
router.get('/editor/rejected-videos', editorMiddleware, rejectedVideos);

export default router;