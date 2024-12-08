import { Router } from 'express';

const usersController = Router();

usersController.post('/register', (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
});

export default usersController;
