import moment from 'moment';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReserveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    bicycle: {
        type: Schema.Types.ObjectId, 
        ref: 'bicycle'
    },
    from: {
        type: Date,
    },
    to: {
        type: Date,
    },
});

ReserveSchema.methods.reservationDays = function () {
    return moment(this.to).diff(moment(this.from), 'days') + 1;
}

const Reserve = mongoose.model('reserve', ReserveSchema);

export default Reserve;