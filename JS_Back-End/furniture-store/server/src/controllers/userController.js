import { Router } from 'express';
import userService from '../services/userService.js';
import { isGuest, isLogged } from '../middlewares/guards.js';
const userController = Router();

userController.post('/register', isGuest, async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userService.register(userInput);
    res.locals.user = user;
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

userController.post('/login', isGuest, async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userService.login(userInput);
    res.locals.user = user;
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

userController.get('/logout', isLogged, async (req, res) => {
  res.status(204).json();
});

export default userController;
