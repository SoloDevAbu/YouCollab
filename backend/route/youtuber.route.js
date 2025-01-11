const { Router } = require('express');
const { createYoutuber, loginYoutuber, updateYoutuber } = require('../controller/youtuber.controller');
const router = Router();

router.post('/singin', createYoutuber);
router.post('/login', loginYoutuber);
router.post('/update', updateYoutuber);

module.exports = router;