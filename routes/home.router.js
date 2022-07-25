import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Página principal',
    });
});

export default router;