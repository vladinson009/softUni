import { Router } from 'express';
import userService from '../services/userService.js';
import jwt from '../libs/jwt.js';
import { JWT_SECRET } from '../constants.js';
const userController = Router();

userController.get('/register', async (req, res) => {
  res.render('user/register');
});
userController.post('/register', async (req, res) => {
  const { username, email, password, repass } = req.body;
  try {
    const user = await userService.register(email, username, password, repass);
    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };
    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' }); // set valid token for 2 hours
    res.cookie('auth', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); //set cookie valid for 2 hours
    res.redirect('/');
  } catch (error) {
    res.render('user/register', { username, email, error: error.message });
  }
});
userController.get('/login', (req, res) => {
  res.render('user/login');
});
userController.post('/login', (req, res) => {
  const { email, password } = req.body;
});

export default userController;
