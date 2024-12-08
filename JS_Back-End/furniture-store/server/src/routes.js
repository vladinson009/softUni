import { Router } from 'express';
import furnitureController from './controllers/furnitureController.js';
import usersController from './controllers/usersController.js';

const routes = Router();
routes.use('/data', furnitureController);
routes.use('/users', usersController);
export default routes;
