import { Router } from 'express';
import { createEditor, loginEditor, logoutEditor, updateEditor } from '../controller/editor.controller.js';
const router = Router();

router.post('/signup', createEditor);
router.post('/login', loginEditor);
router.put('/update', updateEditor);
router.post('/logout', logoutEditor);

export default router;