import {Router} from 'express';
import { deleteVideo, editVideo, uploadVideo } from '../controller/editorUploadVideoController.js';
import { editorMiddleware } from '../middleware/editor.mddleware.js';

const router = Router();

router.post('/editorupload', editorMiddleware, uploadVideo);
router.post('/editor/edit', editorMiddleware, editVideo);
router.delete('/editor/delete', editorMiddleware, deleteVideo);

export default router;