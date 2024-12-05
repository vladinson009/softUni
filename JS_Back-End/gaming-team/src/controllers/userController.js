import { Router } from 'express';
import userService from '../services/userService.js';
import createToken from '../utils/createToken.js';
import errorParser from '../utils/errorParser.js';
import { loggedOnly, guestOnly } from '../middlewares/securityGuards.js';
const userController = Router();

//Register user "GET" controller
userController.get('/register', guestOnly, async (req, res) => {
  res.render('user/register');
});
//Register user "POST" controller
userController.post('/register', guestOnly, async (req, res) => {
  const { username, email, password, repass } = req.body;
  try {
    const user = await userService.register(email, username, password, repass);
    const token = await createToken(user);
    res.cookie('auth', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); //set cookie valid for 2 hours
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/register', { username, email, error });
  }
});
//Login user "GET" controller
userController.get('/login', guestOnly, (req, res) => {
  res.render('user/login');
});
//Login user "POST" controller
userController.post('/login', guestOnly, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    const token = await createToken(user);
    res.cookie('auth', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);

    res.render('user/login', { email, error });
  }
});
//Logout user "GET" controller
userController.get('/logout', loggedOnly, (req, res) => {
  res.clearCookie('auth');
  res.redirect('/');
});

export default userController;
