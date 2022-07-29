import express from 'express';
import { 
    get_confirm_account,
    get_create_account, 
    get_forgot_password, 
    get_login, 
    get_logout, 
    get_reset_password, 
    post_create_account, 
    post_forgot_password, 
    post_login, 
    post_reset_password
} from '../controllers/auth.controller.js';
import { createValidatorUser, forgotPasswordValidatorUser, resetPasswordValidatorUser } from '../utils/validators/auth.validator.js';

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
//Olvido de contraseña
router.get('/forgot-password', get_forgot_password);
router.post('/forgot-password', forgotPasswordValidatorUser, post_forgot_password);
//restablecer contraseña
router.get("/reset-password/:token", get_reset_password);
router.post("/reset-password/:token", resetPasswordValidatorUser, post_reset_password);

export default router;