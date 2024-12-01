import { Router } from 'express';

const userController = Router();

userController.get('/login', (req, res) => {
  res.render('user/login');
});
// POST
userController.get('/register', (req, res) => {
  res.render('user/register');
});
// POST

export default userController;
