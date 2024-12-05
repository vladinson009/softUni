import { Router } from 'express';
import createSelectOptions from '../utils/createSelectOptions.js';
import gameService from '../services/gameService.js';
const platforms = ['-------', 'PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

const homeController = Router();
// Home controller
homeController.get('/', (req, res) => {
  res.render('home');
});
// Search controller
homeController.get('/search', async (req, res) => {
  try {
    const options = createSelectOptions(platforms);
    const games = await gameService.getAll().lean();
    res.render('search', { options, games });
  } catch (error) {
    res.render('/404');
  }
});
// Search controller by Criteria
homeController.get('/search/criteria', async (req, res) => {
  const { name, platform } = req.query;
  try {
    const options = createSelectOptions(platforms, platform);
    const games = await gameService.searchCriteria(name, platform).lean();
    res.render('search', { fields: req.query, options, games });
  } catch (error) {
    res.render('/404');
  }
});
export default homeController;
