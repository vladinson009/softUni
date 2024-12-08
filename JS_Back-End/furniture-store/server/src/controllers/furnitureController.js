import { Router } from 'express';

const furnitureController = Router();

furnitureController.get('/catalog', (req, res) => {
  res.send(JSON.stringify([]));
});

export default furnitureController;
