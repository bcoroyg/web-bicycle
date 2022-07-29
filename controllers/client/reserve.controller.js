import moment from 'moment';
import BicycleService from '../../services/bicycle.service.js';
import UserService from '../../services/user.service.js';
import ReserveService from '../../services/reserve.service.js';

const serviceBicycle = BicycleService.getInstance();
const serviceUser = UserService.getInstance();
const serviceReserve = ReserveService.getInstance();

export const get_bicycles = async (req, res) => {
    try {
        const bicycles = await serviceBicycle.find()
        return res.render('client/bicycle', {
            title: 'Bicicletas',
            bicycles
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/');
    }
};

export const post_bicycle_reserve = async (req, res) => {
    const { bicyId } = req.params;
    const { userId, from, to } = req.body;
    try {
        const user = await serviceUser.findById({ id: userId });
        await serviceBicycle.findByIdAndUpdate({ id: bicyId, data: { reserved: true } });
        const data = {
            user: user._id,
            bicycle: bicyId,
            from: moment(from),
            to: moment(to),
        }
        console.log(data)
        await serviceReserve.create({ data })
        return res.redirect('/bicycles')
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/');
    }
};

export const get_my_reserves = async (req, res) => {
    const { id } = req.params;
    try {
        const reserves = await serviceReserve.findPopulate({ option: { user: id }, pupulate:'bicycle'})
        return res.render('client/reserve', {
            title: 'Mis reservas',
            reserves
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/');
    }
};