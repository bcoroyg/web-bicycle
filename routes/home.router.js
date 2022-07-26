import express from 'express';
import BicycleService from '../services/bicycle.service.js';

const serviceBicycle = BicycleService.getInstance();
const router = express.Router();

router.get('/', async (req, res) => {
    const bicycles = await serviceBicycle.find({reserved:false});
    return res.render('home', {
        title: 'Página Principal',
        bicycles
    });
});

export default router;