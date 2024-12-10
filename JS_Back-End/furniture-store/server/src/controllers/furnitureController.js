import { Router } from 'express';
import furnitureService from '../services/furnitureService.js';
import { isLogged } from '../middlewares/guards.js';
const furnitureController = Router();

furnitureController.get('/catalog', async (req, res) => {
  const query = req.query;
  try {
    const furniture = await furnitureService.getAll(query);
    res.json(furniture);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
furnitureController.post('/catalog', isLogged, async (req, res) => {
  const userInput = req.body;
  const ownerId = req.user?._id;
  try {
    const furniture = await furnitureService.create(userInput, ownerId);
    res.json(furniture);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
furnitureController.get('/catalog/:furnitureId', async (req, res) => {
  const furnitureId = req.params.furnitureId;
  try {
    const furniture = await furnitureService.getById(furnitureId);
    res.json(furniture);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
furnitureController.put('/catalog/:furnitureId', isLogged, async (req, res) => {
  const furnitureId = req.params.furnitureId;
  const userInput = req.body;
  try {
    const furniture = await furnitureService.updateById(furnitureId, userInput);
    res.json(furniture);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
furnitureController.delete('/catalog/:furnitureId', isLogged, async (req, res) => {
  const furnitureId = req.params.furnitureId;
  try {
    const furniture = await furnitureService.deleteById(furnitureId);
    res.json(furniture);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
export default furnitureController;
