import express from 'express';
import { get_bicycles, get_my_reserves, post_bicycle_reserve } from '../controllers/client/reserve.controller.js';
import { verifyUser } from '../utils/middlewares/auth.middleware.js';

const router = express.Router();

router.get('/bicycles', verifyUser, get_bicycles);
router.get('/reserves/:id', verifyUser, get_my_reserves);
router.post('/reserves/:bicyId/create', verifyUser, post_bicycle_reserve);

export default router;