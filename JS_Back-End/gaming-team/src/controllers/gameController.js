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
gameController.get('/details/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  const userId = res.locals.user?._id;

  try {
    const game = await gameService.getById(gameId).lean();
    const isAuthor = game.owner.toString() == userId;
    const isBought = game.boughtBy.some((el) => el.toString() == userId);

    res.render('game/details', { ...game, isBought, isAuthor });
  } catch (error) {
    res.redirect('/404');
  }
});
gameController.get('/edit/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  try {
    const game = await gameService.getById(gameId).lean();
    const options = createSelectOptions(platforms, game.platform);
    res.render('game/edit', { game, options });
  } catch (error) {
    res.redirect('/404');
  }
});
gameController.post('/edit/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  const game = req.body;
  try {
    await gameService.updateById(gameId, game);
    res.redirect('/games/details/' + gameId);
  } catch (err) {
    const error = errorParser(err);
    const options = createSelectOptions(platforms, req.body.platform);
    res.render('game/edit', { game, options, error });
  }
});
gameController.get('/delete/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  try {
    await gameService.deleteById(gameId);
    res.redirect('/games/catalog');
  } catch (error) {
    res.render('/404');
  }
});
export default gameController;
