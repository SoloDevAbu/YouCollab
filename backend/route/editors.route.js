const { Router } = require('express');
const { createEditor, loginEditor, updateEditor } = require('../controller/editor.controller');
const router = Router();

router.post('/singin', createEditor);
router.post('/login', loginEditor);
router.post('/update', updateEditor);

module.exports = router;