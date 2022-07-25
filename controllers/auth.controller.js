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

export const post_login = passport.authenticate('local', {
    successRedirect: '/dashboard/bicycles',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios.'
});

export const get_logout = (req, res) => {
    req.logOut((err)=>{
        if(err) {
            req.flash('error', err);
            return res.redirect('/login');
        }
        req.flash('success', 'Cerraste sesión correctamente.');
        return res.redirect('/login');
    });
};