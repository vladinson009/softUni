import { Router } from 'express';
import furnitureService from '../services/furnitureService.js';

const furnitureController = Router();

furnitureController.get('/catalog', async (req, res) => {
  const furniture = await furnitureService.getAll();

  res.json(furniture);
});

export default furnitureController;
