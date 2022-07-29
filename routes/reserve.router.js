import express from 'express';
import { get_reserves, get_update_reserve, post_delete_reserve, post_update_reserve } from '../controllers/reserve.controller.js';
import { verifyAdmin } from '../utils/middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', verifyAdmin, get_reserves);
router.get('/:id/update', verifyAdmin, get_update_reserve);
router.post('/:id/update', verifyAdmin, post_update_reserve);
router.post('/:id/delete', verifyAdmin, post_delete_reserve);

export default router