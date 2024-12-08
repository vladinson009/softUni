import { Router } from 'express';
import userService from '../services/userService.js';

const usersController = Router();

usersController.post('/register', async (req, res) => {
  const { email, password, rePass } = req.body;

  try {
    const user = await userService.register(email, password, rePass);
    res.status(200).json(user);
  } catch (error) {
    throw error.message;
  }
});
usersController.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    throw error.message;
  }
});
export default usersController;
