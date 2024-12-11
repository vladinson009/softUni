import { Router } from 'express';
import planetService from '../services/planetService.js';
import createSelectOptions from '../utils/selectParser.js';
import { loggedOnly, guestOnly } from '../middlewares/guards.js';
const rings = ['---', 'Yes', 'No'];
const type = ['---', 'Inner', 'Outer', 'Dwarf'];
const planetController = Router();

planetController.get('/create', loggedOnly, (req, res) => {
  const ringsOptions = createSelectOptions(rings);
  const typeOptions = createSelectOptions(type);

  res.render('create', { ringsOptions, typeOptions });
});
planetController.post('/create', loggedOnly, async (req, res) => {
  const userInput = req.body;
  const userId = res.locals.user?._id;
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  try {
    const planet = await planetService.create(userInput, userId);
    res.redirect('/planets/catalog');
  } catch (error) {
    const ringsOptions = createSelectOptions(rings, userInput.rings);
    const typeOptions = createSelectOptions(type, userInput.type);

    res.render('create', {
      userInput,
      error: error.message,
      ringsOptions,
      typeOptions,
    });
  }
});
planetController.get('/catalog', async (req, res) => {
  try {
    const planets = await planetService.getAll().lean();
    res.render('catalog', { planets });
  } catch (error) {
    res.redirect('/404');
  }
});
planetController.get('/details/:planetId', async (req, res) => {
  const planetId = req.params.planetId;
  const userId = res.locals.user?._id;

  try {
    const planet = await planetService.getById(planetId).lean();
    const isAuthor = userId == planet.owner;
    const isLiked = planet.likedList.some((el) => el == userId);

    res.render('details', { planet, isAuthor, isLiked });
  } catch (error) {
    res.redirect('/404');
  }
});
planetController.get('/like/:planetId', loggedOnly, async (req, res) => {
  const planetId = req.params.planetId;
  const userId = res.locals.user?._id;
  const ownerId = (await planetService.getById(planetId).select('owner -_id').lean()).owner;
  if (!userId || userId == ownerId) {
    res.redirect('/404');
  }
  try {
    if (userId) {
      await planetService.addLike(planetId, userId);
      res.redirect('/planets/details/' + planetId);
    }
  } catch (error) {
    res.redirect('/404');
  }
});
planetController.get('/delete/:planetId', loggedOnly, async (req, res) => {
  const planetId = req.params.planetId;
  try {
    const planet = await planetService.deleteById(planetId);
    const userId = res.locals.user?._id;
    const ownerId = planet.owner.toString();
    if (userId != ownerId) {
      return res.redirect('/404');
    }
    res.redirect('/planets/catalog');
  } catch (error) {
    res.redirect('/404');
  }
});
planetController.get('/edit/:planetId', loggedOnly, async (req, res) => {
  const planetId = req.params.planetId;
  try {
    const planet = await planetService.getById(planetId).lean();
    const userId = res.locals.user?._id;
    const ownerId = planet.owner.toString();
    if (userId != ownerId) {
      return res.redirect('/404');
    }
    const ringsOptions = createSelectOptions(rings, planet.rings);
    const typeOptions = createSelectOptions(type, planet.type);
    res.render('edit', { planet, ringsOptions, typeOptions });
  } catch (error) {
    res.redirect('/404');
  }
});
planetController.post('/edit/:planetId', loggedOnly, async (req, res) => {
  const planetId = req.params.planetId;
  const userInput = req.body;
  try {
    const planet = await planetService.updateById(planetId, userInput).lean();
    const userId = res.locals.user?._id;
    const ownerId = planet.owner.toString();
    if (userId != ownerId) {
      return res.redirect('/404');
    }
    res.redirect('/planets/details/' + planetId);
  } catch (error) {
    const ringsOptions = createSelectOptions(rings, userInput.rings);
    const typeOptions = createSelectOptions(type, userInput.type);
    res.render('edit', {
      planet: userInput,
      ringsOptions,
      typeOptions,
      error: error.message,
    });
  }
});
export default planetController;
