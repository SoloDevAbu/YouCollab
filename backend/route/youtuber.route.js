const { Router } = require('express');
const { createYoutuber, loginYoutuber, updateYoutuber, logoutYoutuber } = require('../controller/youtuber.controller');
const router = Router();

router.post('/singin', createYoutuber);
router.post('/login', loginYoutuber);
router.put('/update', updateYoutuber);
router.post('/logout', logoutYoutuber);

module.exports = router;