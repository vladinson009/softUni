import { Router } from 'express';
import homeController from './controllers/homeController.js';
import userController from './controllers/userController.js';

const router = Router();

router.use(homeController);
router.use('/user', userController);
export default router;
