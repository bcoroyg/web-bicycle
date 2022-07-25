import crypto from 'crypto';
import UserService from '../services/user.service.js';
import sendMail from '../utils/mail/nodemailer.js';

const serviceUser = UserService.getInstance();

export const get_login = (req, res) => {
    return res.render('auth/login', {
        title:"Iniciar sesión",
        errors: {}
    });
};

export const get_create_account = async  (req, res) => {
    return res.render('auth/create-account', { 
        title: 'Crear cuenta',
        errors: {}
    });
};

export const post_create_account = async  (req, res) => {
    const {name, email, password } = req.body;
    try {
        const data = {
            name, 
            email, 
            password,
        };

        const user = await serviceUser.create({data});

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
        if(err.errors.email){
            req.flash('errors', { email: err.errors.email.message });
            req.flash('values', { name, email:''});
            return res.redirect('/create-account')
        }
        req.flash('error', error.message);
        res.redirect('/create-account')
    };
};