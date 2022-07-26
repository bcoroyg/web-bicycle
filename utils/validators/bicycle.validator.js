import { check, body, validationResult } from 'express-validator';

export const createValidatorBicycle = [
    //Sanitizar
    body('color').escape(),
    body('model').escape(),
    body('lat').escape(),
    body('lng').escape(),
    //validar
    check('color', 'El color es obligatorio.').notEmpty(),
    check('model', 'El modelo es obligatorio.').notEmpty(),
    check('lat', 'La latitud es obligatoria.').notEmpty(),
    check('lng', 'La longitud es obligatoria.').notEmpty(),
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
            req.flash('values', req.body)
            return res.redirect('/dashboard/bicycles/create');
        }
        next()
    }
];

export const updateValidatorBicycle = [
    //Sanitizar
    body('color').escape(),
    body('model').escape(),
    body('lat').escape(),
    body('lng').escape(),
    //validar
    check('color', 'El color es obligatorio.').notEmpty(),
    check('model', 'El modelo es obligatorio.').notEmpty(),
    check('lat', 'La latitud es obligatoria.').notEmpty(),
    check('lng', 'La longitud es obligatoria.').notEmpty(),
    (req, res, next) => {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            let data = {};
            const error = errors.map(err => {
                return data = {
                    ...data,
                    [`${err.param}`]: err.msg
                };
            });
            req.flash('errors', error.pop());
            req.flash('values', req.body)
            return res.redirect(`/dashboard/bicycles/${req.params.id}/update`);
        }
        next()
    }
];