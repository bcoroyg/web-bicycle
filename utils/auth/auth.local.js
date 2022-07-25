import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserService from '../../services/user.service.js';

const service = UserService.getInstance();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await service.findOne({email});
    console.log(user)
    //Verifica si el usuario existe
    if (!user) {
        return done(null, false, {
            message: 'Usuario o contraseña incorrecta.'
        });
    };

    //Verifica si el password es correcto
    if (!(await user.validPassword(password))) {
        return done(null, false, {
            message: 'Usuario o contraseña incorrecta.'
        });
    };

    if (!user.verified) {
        return done(null, false, {
            message: 'Debe Activar su cuenta.'
        });
    };

    //retorna el usuario
    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    const user = await service.findOne({_id: id});
    return done(null, user)
});

export default passport;