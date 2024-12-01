import { Router } from 'express';
import userService from '../services/userService.js';
import { errorParser } from '../utils/errorParser.js';
import { createToken } from '../utils/tokenParser.js';
import { loggedOnly, guestOnly } from '../middlewares/guardsMiddleware.js';
const userController = Router();

userController.get('/register', guestOnly, (req, res) => {
  res.render('user/register');
});
userController.post('/register', guestOnly, async (req, res) => {
  const { username, email, password, repass } = req.body;
  try {
    const user = await userService.register(username, email, password, repass);
    createToken(user, res);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/register', { username, email, error });
  }
});

userController.get('/login', guestOnly, (req, res) => {
  res.render('user/login');
});
userController.post('/login', guestOnly, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    createToken(user, res);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/login', { email, error });
  }
});
userController.get('/logout', loggedOnly, (req, res) => {
  res.clearCookie('auth');
  res.redirect('/user/login');
});
export default userController;
