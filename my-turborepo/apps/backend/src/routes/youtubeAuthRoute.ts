import { Router } from 'express';
import { googleAuth, googleAuthCallback } from '../controllers/authController';
import { youtuberMiddleware } from '../middleware/youtuber.middleware';

const router = Router();

router.get('/auth/google', youtuberMiddleware, googleAuth);
router.get('/auth/callback', youtuberMiddleware, googleAuthCallback);

export default router;
