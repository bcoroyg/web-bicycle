import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BicycleSchema = new Schema({
    code: {
        type: String,
        unique: true,
    },
    color: {
        type: String,
        required: [true, 'El color es obligatorio.']
    },
    model: {
        type: String,
        required: [true, 'El modelo es obligatorio.']
    },
    reserved:{
        type: Boolean,
        default:false,
    },
    location: {
        type: [Number], 
        index: { 
            type: '2dsphere ', 
            sparse: true ,
        },
    },
});

const Bicycle = mongoose.model('bicycle', BicycleSchema);

export default Bicycle;