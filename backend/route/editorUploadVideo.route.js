import {Router} from 'express';
import { deleteVideo, editVideo, uploadVideo } from '../controller/editorUploadVideoController';
import { editorMiddleware } from '../middleware/editor.mddleware';

export const router = Router();

router.post('/editorupload', editorMiddleware, uploadVideo);
router.post('/editor/edit', editorMiddleware, editVideo);
router.delete('/editor/delete', editorMiddleware, deleteVideo);