import express from 'express';
import { 
    get_bicycles, 
    get_create_bicycle, 
    get_update_bicycle, 
    post_create_bicycle,
    post_delete_bicycle,
    post_update_bicycle,
} from '../controllers/bicycle.controller.js';
import { verifyAdmin } from '../utils/middlewares/auth.middleware.js';
import { createValidatorBicycle, updateValidatorBicycle } from '../utils/validators/bicycle.validator.js';

const router = express.Router();

router.get('/', verifyAdmin, get_bicycles);
router.get('/create', verifyAdmin, get_create_bicycle);
router.post('/create', verifyAdmin, createValidatorBicycle, post_create_bicycle);
router.get('/:id/update', verifyAdmin, get_update_bicycle);
router.post('/:id/update', verifyAdmin, updateValidatorBicycle, post_update_bicycle);
router.post('/:id/delete', verifyAdmin, post_delete_bicycle);

export default router;