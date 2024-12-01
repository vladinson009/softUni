import { Router } from 'express';
import homeController from './controllers/homeController.js';
import volcanoController from './controllers/volcanoController.js';
import userController from './controllers/userController.js';
export const router = Router();
router.use(homeController);
router.use('/volcanoes', volcanoController);
router.use('/user', userController);
router.all('*', (req, res) => res.render('404'));
