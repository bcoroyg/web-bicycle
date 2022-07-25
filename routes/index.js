import express from 'express';
import authRouter from './auth.router.js';
import homeRouter from './home.router.js';

const routerAPP = (app) => {
    const router = express.Router();
    app.use('/', router);
    router.use('/', homeRouter);
    router.use('/', authRouter);
};

export default routerAPP;