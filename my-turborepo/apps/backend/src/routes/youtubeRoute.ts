import { Router } from 'express';
import { authMiddleware } from '../middleware/youtubeAuthMiddleware';
import { getChannelInfo, uploadVideoToYoutube } from '../controllers/youtubeController';
import { youtuberMiddleware } from '../middleware/youtuber.middleware';

const router = Router();

router.get('/channel/info', youtuberMiddleware, authMiddleware, getChannelInfo);
router.post('/upload-video/:videoId', authMiddleware, uploadVideoToYoutube);

export default router;
