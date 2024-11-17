import { Router } from 'express';
import { router as homeRouter } from './controllers/homeController.js';
import { router as aboutRouter } from './controllers/aboutController.js';
import { router as moviesRouter } from './controllers/moviesController.js';

const router = Router();
router.use(homeRouter, aboutRouter);
router.use('/movies', moviesRouter);

export { router };
