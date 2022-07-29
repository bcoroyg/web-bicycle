import { check, body, validationResult } from 'express-validator';

export const createValidatorUser = [
    //Sanitizar
    body('name').escape(),
    body('email').escape(),
    body('password').escape(),
    body('confirmPassword').escape(),
    //validar
    check('name', 'El nombre es obligatorio.').notEmpty(),
    check('email', 'El correo es obligatorio.').notEmpty(),
    check('password', 'La contraseña es obligatoria.').notEmpty(),
    check('confirmPassword', 'Confirmar contraseña es obligatoria.').notEmpty(),
    check('confirmPassword', 'No conciden con el password ingresado.').not().custom((value, { req }) => req.body.password !== value),
    (req, res, next) => {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            let data = {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
            const error = errors.map(err => {
                return data = {
                    ...data,
                    [`${err.param}`]: err.msg
                };
            });
            req.flash('errors', error.pop());
            req.flash('values', req.body)
            return res.redirect('/create-account');
        }
        next()
    }
];

export const forgotPasswordValidatorUser = [
    //Sanitizar
    body('email').escape(),
    //validar
    check('email', 'El correo es obligatorio.').notEmpty(),
    (req, res, next) => {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            let error = {};
            errors.forEach(err => {
                error = {
                    ...error,
                    [`${err.param}`]: err.msg
                };
            });
            req.flash('errors', error);
            return res.redirect('/forgot-password');
        }
        next()
    }
];

export const resetPasswordValidatorUser = [
    //Sanitizar
    body('password').escape(),
    body('confirmPassword').escape(),
    //validar
    check('password', 'La contraseña es obligatoria.').notEmpty(),
    check('confirmPassword', 'Confirmar contraseña es obligatoria.').notEmpty(),
    check('confirmPassword', 'La contraseña ingresada no coincide.').not().custom((value, { req }) => req.body.password !== value),
    (req, res, next) => {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            let error = {};
            errors.forEach(err => {
                error = {
                    ...error,
                    [`${err.param}`]: err.msg
                };
            });
            req.flash('errors', error);
            return res.redirect(`/reset-password/${req.params.token}`);
        }
        next()
    }
];