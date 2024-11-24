import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { register } from '../services/userService.js';
export const router = Router();

router.get('/register', (req, res) => {
  res.render('user/register');
});
router.post('/register', async (req, res) => {
  const { email, password, repass } = req.body;
  res.locals.email = email;
  try {
    if (!email || !password) {
      throw new Error('All fields are required!');
    }
    if (password != repass) {
      throw new Error('Passwords does not match!');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters!');
    }
    const userData = await register(email, password);
    const payload = {
      email: userData.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });
    res.cookie('auth', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
    res.redirect('/');
  } catch (error) {
    const err = error.message;
    res.render('user/register', { email, err });
  }
});
