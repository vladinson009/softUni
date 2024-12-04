import { Router } from 'express';
import createSelectOptions from '../utils/createSelectOptions.js';
import errorParser from '../utils/errorParser.js';
import gameService from '../services/gameService.js';
const gameController = Router();
const platforms = ['-------', 'PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

// Catalog controller
gameController.get('/catalog', async (req, res) => {
  try {
    const games = await gameService.getAll().lean();
    res.render('game/catalog', { games });
  } catch (error) {
    res.redirect('/404');
  }
});
// Create post controller
gameController.get('/create', (req, res) => {
  const options = createSelectOptions(platforms, req.body.platform);
  res.render('game/create', { options });
});
gameController.post('/create', async (req, res) => {
  const data = req.body;
  const ownerId = res.locals.user?._id;
  try {
    await gameService.create(data, ownerId);
    res.redirect('/games/catalog');
  } catch (err) {
    const error = errorParser(err);
    const options = createSelectOptions(platforms, req.body.platform);
    res.render('game/create', { data, options, error });
  }
});
// Details controller
// TODO: Details controller

export default gameController;
