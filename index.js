import express from 'express';
import logger from 'morgan';
import createError from 'http-errors';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/index.js';
import routerAPP from './routes/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    const year = new Date;
    res.locals.year = year.getFullYear();
    next();
});

//Router
routerAPP(app);

//404 Página no existente
app.use((req, res, next) => {
    next(createError(404, 'No encontrado.'));
});

// Administración de los errores
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error', {
        title: `Error ${status}`
    });
});

app.listen(config.port, () => {
    console.log(`Server started on port`);
});