const { Router } = require('express');
const { createYoutuber, loginYoutuber, updateYoutuber, logoutYoutuber, sendVerifyOtp, verifyEmail } = require('../controller/youtuber.controller');
const youtuberMiddleware = require('../middleware/youtuber.middleware');
const router = Router();

router.post('/singin', createYoutuber);
router.post('/login', loginYoutuber);
router.put('/update',youtuberMiddleware, updateYoutuber);
router.post('/logout', logoutYoutuber);
router.post('/send-verify-otp', youtuberMiddleware, sendVerifyOtp);
router.post('/verify-account', youtuberMiddleware, verifyEmail);

module.exports = router;