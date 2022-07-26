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
    return res.render('dashboard/bicycle/create',{
        title: 'Nueva bicicleta',
    });
};

export const post_create_bicycle = async (req, res) => {
    const {color, model, lat, lng} = req.body;
    try {
        const data = {
            code: shortid.generate(),
            color,
            model,
            location: [lat, lng],
        };
        await serviceBicycle.create({data});
        req.flash('success', 'Bicicleta creada exitosamente.')
        return res.redirect('/dashboard/bicycles/create');
    } catch (err) {
        console.log(err)
    };
};