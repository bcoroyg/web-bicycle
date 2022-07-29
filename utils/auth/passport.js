import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import UserService from '../../services/user.service.js';
import config from '../../config/index.js';

const userService = UserService.getInstance();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userService.findOne({ email });
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
    } catch (error) {
        return done(error)
    }
}));

//Google
passport.use(new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: `${config.host}/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userService.findOne({
            $or: [
                { 'googleId': profile.id },
                { 'email': profile.emails[0].value }
            ],
        });

        if (!user) {
            const data = {
                name: profile.displayName || "SIN NOMBRE",
                email: profile.emails[0].value,
                password: await bcrypt.hash(shortid.generate(), 10),
                verified: true,
                googleId: profile.id,
            };
            const userGoogle = await userService.create({ data });
            return done(null, userGoogle);
        };

        return done(null, user);
    } catch (error) {
        return done(error);
    };
}));

//Facebook
passport.use(new FacebookStrategy({
    clientID: config.facebookId,
    clientSecret: config.facebookSecret,
    callbackURL: `${config.host}/facebook/callback`,
    profileFields: ['displayName', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userService.findOne({
            $or: [
                { 'facebookId': profile.id },
                { 'email': profile.emails[0].value }
            ],
        });

        if (!user) {
            const data = {
                name: profile.displayName || "SIN NOMBRE",
                email: profile.emails[0].value,
                password: await bcrypt.hash(shortid.generate(), 10),
                verified: true,
                facebookId: profile.id,
            };
            const userFacebook = await userService.create({ data });
            return done(null, userFacebook);
        };
        return done(null, user);
    } catch (error) {
        return done(error);
    };
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    const user = await userService.findOne({ _id: id });
    return done(null, user)
});

export default passport;