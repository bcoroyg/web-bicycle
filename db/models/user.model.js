import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingresa un correo válido.'],
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    role:{
        type: String,
        default:"Customer"
    },
    token: {
        type: String
    },
    expireToken: {
        type: Date
    },
    avatar: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
    }
});

UserSchema.plugin(uniqueValidator, { message: '{VALUE} ya existe, intente nuevamente.' });

UserSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
    next();
});

UserSchema.methods.toJSON = function() {
    const {__v, password, token, verified, ...user} = this.toObject();
    return user;
};

const User = mongoose.model('user', UserSchema);

export default User;