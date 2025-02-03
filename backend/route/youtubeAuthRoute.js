import { Router } from 'express';
import { googleAuth, googleAuthCallback } from '../controller/authController.js';
import { youtuberMiddleware } from '../middleware/youtuber.middleware.js';

const router = Router();

router.get('/auth/google', googleAuth);
router.get('/auth/callback',youtuberMiddleware, googleAuthCallback);

export default router;