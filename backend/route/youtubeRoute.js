import { Router } from 'express';
import authMiddleware from '../middleware/youtubeAuthMiddleware.js';
import { getChannelInfo, uploadVideoToYoutube } from '../controller/youtubeController.js';
import { youtuberMiddleware } from '../middleware/youtuber.middleware.js';

const router = Router();

router.get('/channel/info',youtuberMiddleware, authMiddleware, getChannelInfo);
router.post('/upload-video', authMiddleware, uploadVideoToYoutube);

export default router;