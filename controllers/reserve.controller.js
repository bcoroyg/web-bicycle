import moment from 'moment';
import ReserveService from '../services/reserve.service.js';
import BicycleService from '../services/bicycle.service.js';

const serviceBicycle = BicycleService.getInstance();
const serviceReserve = ReserveService.getInstance();

//LISTAR
export const get_reserves = async (req, res) => {
    try {
        const reserves = await serviceReserve.findPopulate({ pupulate: 'user bicycle' })
        return res.render('dashboard/reserve/index', {
            title: 'Lista de reservas',
            reserves,
            moment,
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/dashboard/reserves');
    }
};

export const get_update_reserve = async (req, res) => {
    const { id } = req.params;
    try {
        const reserve = await serviceReserve.findById({ id });

        if (!reserve) {
            req.flash('error', 'La reserva que desea actualizar no existe.');
            return res.redirect('/dashboard/reserves');
        }
        return res.render('dashboard/reserve/update', {
            title: 'Actualizar reserva',
            reserve,
            moment,
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/dashboard/reserves');
    }
};

export const post_update_reserve = async (req, res) => {
    const { id } = req.params;
    const { from, to } = req.body;
    try {
        const data = {
            from: moment(from),
            to: moment(to),
        };
        const reserve = await serviceReserve.findByIdAndUpdate({ id, data });
        if (!reserve) {
            req.flash('error', 'Reserva que desea actualizar no existe.');
            return res.redirect('/dashboard/reserves');
        };
        req.flash('success', 'Reserva actualizada exitosamente.')
        return res.redirect('/dashboard/reserves');
    } catch (err) {
        return res.render('reserve/update', {
            errors: err.errors,
            from,
            to,
            moment,
        });
    };
};

export const post_delete_reserve = async (req, res) => {
    const { id } = req.params;
    try {
        const reserve = await serviceReserve.findByIdAndDelete({ id });

        if (!reserve) {
            req.flash('error', 'Reserva que desea eliminar no existe.');
            return res.redirect('/dashboard/reserves');
        };
        await serviceBicycle.findByIdAndUpdate({ id: reserve.bicycle, data: { reserved: false } });
        req.flash('success', 'Reserva eliminada exitosamente.')
        return res.redirect('/dashboard/reserves');
    } catch (err) {
        return res.render('reserve', {
            errors: err.errors,
        });
    };
};