import { Router } from 'express';
import { createYoutuber, loginYoutuber, updateYoutuber, logoutYoutuber, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword, getYoutuber, addEditor, getEditors, removeEditor } from '../controller/youtuber.controller.js';
import {youtuberMiddleware} from '../middleware/youtuber.middleware.js';
const router = Router();

router.post('/signup', createYoutuber);
router.post('/login', loginYoutuber);
router.put('/update',youtuberMiddleware, updateYoutuber);
router.post('/logout', logoutYoutuber);
router.post('/send-verify-otp', youtuberMiddleware, sendVerifyOtp);
router.post('/verify-account', youtuberMiddleware, verifyEmail);
router.post('/isauthenticated', youtuberMiddleware, isAuthenticated);
router.post('/sent-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);
router.get('/profile', youtuberMiddleware, getYoutuber);
router.put('/add-editor', youtuberMiddleware, addEditor);
router.get('/editors', youtuberMiddleware, getEditors);
router.put('/remove-editor/:editorId', youtuberMiddleware, removeEditor);

export default router;