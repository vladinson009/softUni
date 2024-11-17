import { Router } from 'express';
import { router as homeRouter } from './controllers/homeController.js';
import { router as aboutRouter } from './controllers/aboutController.js';
import { router as createRouter } from './controllers/moviesController.js';

const router = Router();
router.use(homeRouter, aboutRouter, createRouter);
// router.use();
// router.use();

export { router };
