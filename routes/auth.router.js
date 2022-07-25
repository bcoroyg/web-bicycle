import express from 'express';
import { get_create_account, get_login } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/create-account', get_create_account);
router.get('/login', get_login);

export default router;