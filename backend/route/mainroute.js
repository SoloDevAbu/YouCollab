import { Router } from 'express';
import editorRoute from './editors.route';
import youtuberRoute from './youtuber.route';
import editorUploadVideoRoute from './editorUploadVideo.route'
const router = Router();

router.use('/editor', editorRoute);
router.use('/youtuber', youtuberRoute);
router.use('/video', editorUploadVideoRoute);

export default router;