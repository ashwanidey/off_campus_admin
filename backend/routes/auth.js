import { Router } from 'express';
import { login, verifyToken } from '../controller/authController.js';

const router = Router();

router.post('/login', login);
router.get('/verify-token',verifyToken)

export default router;