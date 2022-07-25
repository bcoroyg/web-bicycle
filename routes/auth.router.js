import express from 'express';
import { 
    get_confirm_account,
    get_create_account, 
    get_login, 
    get_logout, 
    post_create_account, 
    post_login 
} from '../controllers/auth.controller.js';
import { createValidatorUser } from '../utils/validators/auth.validator.js';

const router = express.Router();

//Crear Cuenta
router.get('/create-account', get_create_account);
router.post('/create-account', createValidatorUser, post_create_account);
//Activar cuenta
router.get('/confirmation-account/:token', get_confirm_account);
//Iniciar Sesión
router.get('/login', get_login);
router.post('/login', post_login);
//Cerrar Sesión
router.get('/logout', get_logout);

export default router;