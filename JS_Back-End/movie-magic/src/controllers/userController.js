import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { login, register } from '../services/userService.js';
import { isUserGuard } from '../middlewares/authMiddleware.js';
export const router = Router();

router.get('/register', isUserGuard, (req, res) => {
  res.render('user/register');
});
router.post('/register', isUserGuard, async (req, res) => {
  const { email, password, repass } = req.body;
  res.locals.email = email;
  try {
    const user = await register(email, password, repass);
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.SECRET, {
      expiresIn: '2h',
    });
    res.cookie('auth', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
    res.redirect('/');
  } catch (error) {
    return res.render('user/register', { email, err: error.message });
  }
});
router.get('/login', isUserGuard, (req, res) => {
  res.render('user/login');
});
router.post('/login', isUserGuard, async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  res.cookie('auth', user, { maxAge: 2 * 60 * 60 * 1000 });
  res.redirect('/');
});
router.get('/logout', (req, res) => {
  res.clearCookie('auth');
  res.redirect('/');
});
