import { Router } from 'express';
import homeController from './controllers/homeController.js';
import userController from './controllers/userController.js';
import gameController from './controllers/gameController.js';

const router = Router();

router.use(homeController);
router.use('/user', userController);
router.use('/games', gameController);
router.use('*', (req, res) => res.render('404'));
export default router;
