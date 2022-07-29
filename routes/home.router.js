import express from 'express';
import { get_home } from '../controllers/client/home.controller.js';
const router = express.Router();

router.get('/', get_home);

export default router;