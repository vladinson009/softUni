import { Router } from 'express';
import furnitureController from './controllers/furnitureController.js';
import userController from './controllers/userController.js';

const routes = Router();
routes.use('/data', furnitureController);
routes.use('/users', userController);
export default routes;
