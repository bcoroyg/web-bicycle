import crypto from 'crypto';
import UserService from '../services/user.service.js';
import sendMail from '../utils/mail/nodemailer.js';
import passport from '../utils/auth/auth.local.js';

const serviceUser = UserService.getInstance();

export const get_create_account = async (req, res) => {
    return res.render('auth/create-account', {
        title: 'Crear cuenta',
    });
};

export const post_create_account = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const data = {
            name,
            email,
            password,
        };

        const user = await serviceUser.create({ data });

        user.token = crypto.randomBytes(16).toString('hex');
        //guardando los datos en la base de datos.
        await user.save();
        //Creación de la url
        const url = `${req.headers.origin}/confirmation-account/${user.token}`

        //Enviar notificación por Correo
        sendMail({
            user,
            subject: 'Activación de cuenta',
            file: 'confirm-account',
            url
        });
        req.flash('success', 'Se envio correo de activación de cuenta.')
        res.redirect('/login')
    } catch (err) {
        if (err.errors.email) {
            req.flash('errors', { email: err.errors.email.message });
            req.flash('values', { name, email: '' });
            return res.redirect('/create-account')
        }
        req.flash('error', error.message);
        res.redirect('/create-account')
    };
};

export const get_confirm_account = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await serviceUser.findOne({ token });

        if (!user) {
            req.flash('error', 'No encontramos un usuario con este token. Quizá haya expirado y debas solicitarlo nuevamente');
            return res.redirect('/login');
        };

        user.verified = true;
        user.token = undefined

        await user.save();

        req.flash('success', 'Su cuenta fue activada exitosamente.')
        return res.redirect('/login');
    } catch (error) {
        console.log(error)
        req.flash('error', 'Error al activar cuenta.')
        return res.redirect('/login');
    };
};

export const get_login = (req, res) => {
    return res.render('auth/login', {
        title: "Iniciar sesión",
    });
};

export const post_login = [passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios.'
}), (req, res) => {
    if (req.user.role === 'Admin') {
        res.redirect('/dashboard/bicycles');
    } else {
        res.redirect('/bicycles')
    }
}];

export const get_logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            req.flash('error', err);
            return res.redirect('/login');
        }
        req.flash('success', 'Cerraste sesión correctamente.');
        return res.redirect('/login');
    });
};

export const get_forgot_password = (req, res) => {
    return res.render('auth/forgot-password', {
        title: "Restablecer Contraseña"
    });
};

export const post_forgot_password = async (req, res) => {
    const { email } = req.body;
    try {
        const userDB = await serviceUser.findOne({ email });

        if (!userDB) {
            req.flash('error', 'No existe el correo ingresado, intente nuevamente.');
            return res.redirect('/forgot-password');
        };

        //Creando token
        userDB.token = crypto.randomBytes(16).toString('hex');
        //Expiración del token
        userDB.expireToken = Date.now() + 3600000;
        //Guardando los datos en la base de datos.
        const user = await userDB.save();
        //Creando url de reset password,
        const url = `${req.headers.origin}/reset-password/${user.token}`

        sendMail({
            user,
            subject: 'Restablecer contraseña',
            file: 'reset-password',
            url
        });
        req.flash('success', 'Se envio correo de recuperación de contraseña.')
        return res.redirect('/login');
    } catch (error) {
        console.log(error)
        req.flash('error', 'Error al restablecer contraseña.')
        return res.redirect('/forgot-password');
    };
};

export const get_reset_password = async (req, res) => {
    const { token } = req.params;
    try {
        const userDB = await serviceUser.findOne({ token, expireToken: { $gt: Date.now() } });
        if (!userDB) {
            req.flash('error', 'No encontramos un usuario con este token. Quizá haya expirado y debas solicitarlo nuevamente.');
            return res.redirect('/forgot-password');
        };
        return res.render('auth/reset-password', {
            title: 'Restablecer Constraseña',
            token
        });
    } catch (error) {
        console.log(error)
        req.flash('error', 'Error en el reseteo de contraseña')
        return res.redirect('/login');
    };
};

export const post_reset_password = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await serviceUser.findOne({ token, expireToken: { $gt: Date.now() } });
        //No existe el usuario o el token es invalido

        if (!user) {
            req.flash('error', 'No encontramos un usuario con este token. Quizá haya expirado y debas solicitarlo nuevamente.');
            return res.redirect('/login');
        };

        user.password = password;
        //limpiando token y expiración
        user.token = undefined;
        user.expireToken = undefined;
        //guardando la nueva contraseña
        await user.save();
        req.flash('success', 'Su contraseña fue restablecida exitosamente.');
        return res.redirect('/login');
    } catch (error) {
        console.log(error)
        req.flash('error', 'Error en el reseteo de contraseña')
        return res.redirect('/login');
    };
};