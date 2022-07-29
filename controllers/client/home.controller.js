import BicycleService from '../../services/bicycle.service.js';

const serviceBicycle = BicycleService.getInstance();

export const get_home = async (req, res) => {
    const bicycles = await serviceBicycle.find({ reserved: false });
    return res.render('home', {
        title: 'Página Principal',
        bicycles
    });
}