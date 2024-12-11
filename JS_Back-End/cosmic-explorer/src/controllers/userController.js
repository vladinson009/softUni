import { Router } from 'express';
import userSerice from '../services/userSerice.js';
import { guestOnly, loggedOnly } from '../middlewares/guards.js';
const userController = Router();

userController.get('/register', guestOnly, (req, res) => {
  res.render('register');
});
userController.post('/register', guestOnly, async (req, res) => {
  const userInput = req.body;

  try {
    const user = await userSerice.register(userInput);
    res.cookie('auth', user);
    res.redirect('/');
  } catch (error) {
    res.render('register', { error: error.message, userInput });
  }
});
userController.get('/login', guestOnly, (req, res) => {
  res.render('login');
});
userController.post('/login', guestOnly, async (req, res) => {
  const userInput = req.body;

  try {
    const user = await userSerice.login(userInput);
    res.cookie('auth', user);
    res.redirect('/');
  } catch (error) {
    res.render('login', { error: error.message, userInput });
  }
});
userController.get('/logout', loggedOnly, (req, res) => {
  res.clearCookie('auth');
  res.redirect('/');
});
export default userController;
