const { Router } = require('express');
const router = Router();
const editorRoute = require('./editors.route');
const youtuberRoute = require('./youtuber.route');

router.use('/editor', editorRoute);
router.use('/youtuber', youtuberRoute);

module.exports = router;