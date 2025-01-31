import {Router} from 'express';
import { deleteVideo, editVideo, uploadVideo } from '../controller/editorUploadVideoController.js';
import { editorMiddleware } from '../middleware/editor.mddleware.js';

const router = Router();

router.post('/editor/upload', editorMiddleware, uploadVideo);
router.post('/editor/edit/:videoId', editorMiddleware, editVideo);
router.delete('/editor/delete/:videoId', editorMiddleware, deleteVideo);

export default router;