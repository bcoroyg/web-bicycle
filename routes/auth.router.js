import express from 'express';
import { 
    get_create_account, 
    get_login, 
    post_create_account, 
    post_login 
} from '../controllers/auth.controller.js';
import { createValidatorUser } from '../utils/validators/auth.validator.js';

const router = express.Router();

router.get('/create-account', get_create_account);
router.post('/create-account', createValidatorUser, post_create_account);
router.get('/login', get_login);
router.post('/login', post_login);

export default router;