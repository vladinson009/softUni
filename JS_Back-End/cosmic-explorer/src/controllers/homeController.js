import { Router } from 'express';
import planetService from '../services/planetService.js';

const homeController = Router();

homeController.get('/', (req, res) => {
  res.render('home');
});
homeController.get('/search', async (req, res) => {
  const query = req.query;
  try {
    const planets = await planetService.filter(query).lean();
    console.log(planets);

    res.render('search', { planets, query });
  } catch (error) {
    res.render('search', { error: error.message });
  }
});

export default homeController;
