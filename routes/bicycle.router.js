import express from 'express';
import { 
    get_bicycles, 
    get_create_bicycle, 
    post_create_bicycle
} from '../controllers/bicycle.controller.js';
import { verifyAdmin } from '../utils/middlewares/auth.middleware.js';
import { createValidatorBicycle } from '../utils/validators/bicycle.validator.js';

const router = express.Router();

router.get('/', verifyAdmin, get_bicycles);
router.get('/create', verifyAdmin, get_create_bicycle);
router.post('/create', verifyAdmin, createValidatorBicycle, post_create_bicycle);


export default router;