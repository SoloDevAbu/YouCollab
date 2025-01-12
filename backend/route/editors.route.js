const { Router } = require('express');
const { createEditor, loginEditor, updateEditor, logoutEditor } = require('../controller/editor.controller');
const router = Router();

router.post('/singin', createEditor);
router.post('/login', loginEditor);
router.put('/update', updateEditor);
router.post('/logout', logoutEditor);

module.exports = router;