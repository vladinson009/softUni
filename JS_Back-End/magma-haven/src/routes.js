import { Router } from 'express';
import homeController from './controllers/homeController.js';
import volcanoController from './controllers/volcanoController.js';
export const router = Router();

router.use(homeController);
router.use('/volcanoes', volcanoController);
router.all('*', (req, res) => res.render('404'));
