import shortid from 'shortid';
import BicycleService from '../services/bicycle.service.js';

const serviceBicycle = BicycleService.getInstance();

export const get_bicycles = async (req, res) => {
    const bicycles = await serviceBicycle.find();
    return res.render('dashboard/bicycle/index', {
        title: 'Bicicletas',
        bicycles
    });
};

export const get_create_bicycle = (req, res) => {
    return res.render('dashboard/bicycle/create', {
        title: 'Nueva bicicleta',
    });
};

export const post_create_bicycle = async (req, res) => {
    const { color, model, lat, lng } = req.body;
    try {
        const data = {
            code: shortid.generate(),
            color,
            model,
            location: [lat, lng],
        };
        await serviceBicycle.create({ data });
        req.flash('success', 'Bicicleta creada exitosamente.')
        return res.redirect('/dashboard/bicycles/create');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/dashboard/bicycles');
    };
};

//ACTUALIZAR
export const get_update_bicycle = async (req, res) => {
    const { id } = req.params;
    try {
        const bicycle = await serviceBicycle.findById({ id })
        if (!bicycle) {
            req.flash('error', 'La bicicleta que desea actualizar no existe.');
            return res.redirect('/dashboard/bicycles');
        }
        return res.render('dashboard/bicycle/update', {
            title: 'Actualizar bicicleta',
            bicycle,
        });
    } catch (error) {
        if (error.name === "CastError") {
            req.flash('error', 'La bicicleta que desea actualizar no existe.');
            return res.redirect('/dashboard/bicycles');
        }
        req.flash('error', error.message);
        return res.redirect('/dashboard/bicycles');
    }
}

export const post_update_bicycle = async (req, res) => {
    const { id } = req.params;
    const { color, model, lat, lng } = req.body;

    try {
        const data = {
            color,
            model,
            location: [lat, lng]
        };

        const bicycle = await serviceBicycle.findByIdAndUpdate({ id, data });
        if (!bicycle) {
            req.flash('error', 'La bicicleta que desea actualizar no existe.');
            return res.redirect('/dashboard/bicycles');
        };
        req.flash('success', 'La bicicleta fue actualizada exitosamente.');
        return res.redirect('/dashboard/bicycles');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/dashboard/bicycles');
    };
};

//ELIMINAR
export const post_delete_bicycle = async (req, res) => {
    const { id } = req.params;
    try {
        const bicycle = await serviceBicycle.findByIdAndDelete({ id });
        if (!bicycle) {
            req.flash('error', 'La bicicleta que desea eliminar no existe.');
            return res.redirect('/dashboard/bicycles');
        };
        req.flash('success', 'La bicicleta fue eliminada exitosamente.');
        return res.redirect('/dashboard/bicycles');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/dashboard/bicycles');
    };
};