import { Router } from 'express';
import { router as homeAndSearch } from './controllers/homeController.js';
import { router as aboutRouter } from './controllers/aboutController.js';
import { router as moviesRouter } from './controllers/moviesController.js';
import { router as castRouter } from './controllers/castController.js';
import { router as userRouter } from './controllers/userController.js';
import { isGuestGuard } from './middlewares/authMiddleware.js';
const router = Router();
router.use(homeAndSearch, aboutRouter);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('/cast', isGuestGuard, castRouter);
router.all('*', (req, res) => res.render('404'));

export { router };
