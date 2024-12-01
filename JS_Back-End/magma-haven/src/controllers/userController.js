import { Router } from 'express';
import userService from '../services/userService.js';
const userController = Router();

userController.get('/register', (req, res) => {
  res.render('user/register');
});
// POST
userController.get('/login', (req, res) => {
  res.render('user/login');
});
// POST

export default userController;
