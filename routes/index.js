import express from 'express';

const routerAPP = (app) => {
    const router = express.Router();
    app.use('/', router);
    router.use('/', (req, res) => {
        res.send("Bienvenido");
    });
};

export default routerAPP;