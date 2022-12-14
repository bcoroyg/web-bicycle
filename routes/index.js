import express from 'express';
import authRouter from './auth.router.js';
import homeRouter from './home.router.js';
import bicycleRouter from './bicycle.router.js'
import reserveRouter from './reserve.router.js';
import clientRouter from './client.router.js'

const routerAPP = (app) => {
    const router = express.Router();
    app.use('/', router);
    router.use('/', homeRouter);
    router.use('/', authRouter);
    router.use('/', clientRouter);
    router.use('/dashboard/bicycles', bicycleRouter);
    router.use('/dashboard/reserves', reserveRouter);
};

export default routerAPP;