import { Router } from 'express';
import { router as homeRouter } from './controllers/homeController.js';
const router = Router();

router.use('/', homeRouter);

export { router };
