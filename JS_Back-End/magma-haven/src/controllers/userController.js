import { Router } from 'express';
import userService from '../services/userService.js';
import { errorParser } from '../utils/errorParser.js';
const userController = Router();

userController.get('/register', (req, res) => {
  res.render('user/register');
});
userController.post('/register', async (req, res) => {
  const { username, email, password, repass } = req.body;
  try {
    const user = await userService.register(username, email, password, repass);
    console.log(user);
    res.redirect('/');
  } catch (error) {
    const err = errorParser(error);
    console.log(err);
  }
});
// POST
userController.get('/login', (req, res) => {
  res.render('user/login');
});
// POST

export default userController;
