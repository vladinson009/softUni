import { Router } from 'express';
const gameController = Router();

gameController.get('/catalog', (req, res) => {
  res.render('game/catalog');
});

export default gameController;
