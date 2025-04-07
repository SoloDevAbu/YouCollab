import { Router } from 'express';
import editorRoute from './editors.route';
import youtuberRoute from './youtuber.route';
import videoRoute from './videoRoute';
import youtubeRoute from './youtubeRoute';

const router = Router();

router.use('/editor', editorRoute);
router.use('/youtuber', youtuberRoute);
router.use('/video', videoRoute);
router.use('/youtube', youtubeRoute);

export default router;
