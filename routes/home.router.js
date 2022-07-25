import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Página Principal',
    });
});

export default router;