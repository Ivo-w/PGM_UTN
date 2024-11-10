import express from 'express';
import { register, login } from '../controllers/login.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
