import { Router } from 'express';
import { 
  createEditor,
  loginEditor,
  updateEditor,
  logoutEditor,
  getProfile,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword
} from '../controllers/editor.controller';
import { editorMiddleware } from '../middleware/editor.middleware';

const router = Router();

router.post('/signup', createEditor);
router.post('/login', loginEditor);
router.put('/update', editorMiddleware, updateEditor);
router.post('/logout', logoutEditor);
router.get('/profile', editorMiddleware, getProfile);
router.post('/send-verify-otp', editorMiddleware, sendVerifyOtp);
router.post('/verify-account', editorMiddleware, verifyEmail);
router.post('/isauthenticated', editorMiddleware, isAuthenticated);
router.post('/sent-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);

export default router;
