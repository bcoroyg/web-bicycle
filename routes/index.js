import express from 'express';
import homeRouter from './home.router.js';

const routerAPP = (app) => {
    const router = express.Router();
    app.use('/', router);
    router.use('/', homeRouter);
};

export default routerAPP;