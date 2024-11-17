import { Router } from 'express';
import { router as homeAndSearch } from './controllers/homeController.js';
import { router as aboutRouter } from './controllers/aboutController.js';
import { router as moviesRouter } from './controllers/moviesController.js';

const router = Router();
router.use(homeAndSearch, aboutRouter);
router.use('/movies', moviesRouter);
router.all('*', (req, res) => res.render('404'));
export { router };
