import { Router } from 'express';
import userService from '../services/userService.js';

const userController = Router();

userController.post('/register', async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userService.register(userInput);
    res.json(user);
  } catch (error) {
    throw error;
  }
});
userController.post('/login', async (req, res) => {
  const userInput = req.body;

  try {
    const user = await userService.login(userInput);
    res.json(user);
  } catch (error) {
    throw error;
  }
});
userController.get('/logout', async (req, res) => {
  res.status(204).json();
});

export default userController;
