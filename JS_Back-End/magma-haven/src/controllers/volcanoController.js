import { Router } from 'express';
import { loggedOnly } from '../middlewares/guardsMiddleware.js';
import volcanoService from '../services/volcanoService.js';
import { errorParser } from '../utils/errorParser.js';
import parseOpt from '../utils/volcanoOptParser.js';
import { isValidObjectId } from 'mongoose';
const volcanoController = Router();
const opt = ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'];

volcanoController.get('/catalog', async (req, res) => {
  try {
    const volcanoes = await volcanoService.getAll().lean();
    res.render('volcano/catalog', { volcanoes });
  } catch (err) {
    const error = errorParser(err);
    res.render('volcano/catalog', { error });
  }
});

volcanoController.get('/create', loggedOnly, (req, res) => {
  const options = parseOpt(opt, req.body.typeVolcano);
  res.render('volcano/create', { options });
});
volcanoController.post('/create', async (req, res) => {
  try {
    const ownerId = res.locals.user._id;
    await volcanoService.create(req.body, ownerId);
    res.redirect('/volcanoes/catalog');
  } catch (err) {
    const error = errorParser(err);
    const options = parseOpt(opt, req.body.typeVolcano);
    return res.render('volcano/create', { volcanoData: req.body, options, error });
  }
});
volcanoController.get('/details/:volcanoId', async (req, res) => {
  const volcanoId = req.params.volcanoId;
  try {
    const volcano = await volcanoService.getOne(volcanoId).lean();
    const userId = res.locals.user?._id;

    const isAuthor = userId == volcano.owner.toString();
    const isVoted = volcano.voteList.some((el) => el.toString() == userId);
    const voteCount = volcano.voteList.length;

    res.render('volcano/details', { volcano, isAuthor, isVoted, voteCount });
  } catch (err) {
    const error = errorParser(err);
    res.render('volcano/catalog', { error });
  }
});
volcanoController.get('/edit/:volcanoId', async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = res.locals.user?._id;
  try {
    const volcano = await volcanoService.getOne(volcanoId).lean();
    const isAuthor = userId == volcano.owner.toString();
    if (!isAuthor) {
      return res.redirect('/');
    }
    const options = parseOpt(opt, volcano.typeVolcano);

    res.render('volcano/edit', { volcano, options });
  } catch (err) {
    return res.redirect('/404');
  }
});
// POST
volcanoController.get('/search', (req, res) => {
  res.render('volcano/search');
});
// POST
export default volcanoController;
