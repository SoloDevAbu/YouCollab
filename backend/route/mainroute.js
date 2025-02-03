import { Router } from 'express';
import editorRoute from './editors.route.js';
import youtuberRoute from './youtuber.route.js';
import videoRoute from './videoroute.js';
import youtubeRoute from './youtubeRoute.js'
const router = Router();

router.use('/editor', editorRoute);
router.use('/youtuber', youtuberRoute);
router.use('/video', videoRoute);
router.use('/youtube', youtubeRoute);

export default router;