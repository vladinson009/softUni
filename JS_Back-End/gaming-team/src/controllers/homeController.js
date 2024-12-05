import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res) => {
  console.log(res.locals);

  res.render('home');
});

export default homeController;
