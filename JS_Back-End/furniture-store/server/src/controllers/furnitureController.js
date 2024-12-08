import { Router } from 'express';
import furnitureService from '../services/furnitureService.js';

const furnitureController = Router();

furnitureController.get('/catalog', async (req, res) => {
  try {
    const furnitures = await furnitureService.getAll(req.query);
    res.status(200).json(furnitures);
  } catch (error) {
    throw error.message;
  }
});
furnitureController.post('/catalog', async (req, res) => {
  const data = req.body;

  const ownerId = req.user?._id;
  try {
    const furniture = await furnitureService.create(data, ownerId);
    res.status(201).json({ ...furniture, ownerId });
  } catch (error) {
    throw error.message;
  }
});
furnitureController.get('/catalog/:furnitureId', async (req, res) => {
  const furnitureId = req.params.furnitureId;
  try {
    const furniture = await furnitureService.getById(furnitureId);
    res.status(200).json(furniture);
  } catch (error) {
    throw error.message;
  }
});

export default furnitureController;
