import { Router } from 'express';
import { loggedOnly } from '../middlewares/guardsMiddleware.js';
import volcanoService from '../services/volcanoService.js';
import { errorParser } from '../utils/errorParser.js';
import parseOpt from '../utils/volcanoOptParser.js';
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
volcanoController.post('/create', loggedOnly, async (req, res) => {
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
    const volcano = await volcanoService.getById(volcanoId).lean();
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
volcanoController.get('/edit/:volcanoId', loggedOnly, async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = res.locals.user?._id;
  try {
    const volcano = await volcanoService.getById(volcanoId).lean();
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
volcanoController.post('/edit/:volcanoId', async (req, res) => {
  const data = req.body;
  const volcanoId = req.params.volcanoId;
  try {
    await volcanoService.updateById(volcanoId, data);
    res.redirect('/volcanoes/details/' + volcanoId);
  } catch (err) {
    const error = errorParser(err);
    const options = parseOpt(opt, data.typeVolcano);
    res.render('volcano/edit', { volcano: data, options, error });
  }
});
volcanoController.get('/delete/:volcanoId', async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = res.locals.user?._id;
  try {
    const ownerId = (
      await volcanoService.getById(volcanoId).select('owner -_id').lean()
    ).owner.toString();

    const isAuthor = userId == ownerId;
    if (!isAuthor) {
      return res.redirect('/404');
    }
    await volcanoService.deleteById(volcanoId);
    res.redirect('/volcanoes/catalog');
  } catch (err) {
    return res.redirect('/404');
  }
});
volcanoController.get('/search', async (req, res) => {
  const options = parseOpt(opt);
  try {
    const volcanoes = await volcanoService.getAll().lean();

    res.render('volcano/search', { volcanoes, options });
  } catch (err) {
    const error = errorParser(err);
    res.render('volcano/search', { options, error });
  }
});
volcanoController.get('/search/filter', async (req, res) => {
  const data = req.query;
  const options = parseOpt(opt, data.typeVolcano);
  try {
    const volcanoesQuery = volcanoService.getAll();

    if (data.name) {
      volcanoesQuery.find({ name: { $regex: data.name, $options: 'i' } });
    }
    if (data.typeVolcano) {
      volcanoesQuery.find({ typeVolcano: data.typeVolcano });
    }
    const volcanoes = await volcanoesQuery.lean();
    res.render('volcano/search', { volcanoes, options, name: data.name });
  } catch (err) {
    const error = errorParser(err);
    res.render('volcano/search', { options, error });
  }
});

volcanoController.get('/vote/:volcanoId', async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = res.locals.user?._id;
  if (!userId) {
    throw new Error('User ID does not exist!');
  }
  try {
    await volcanoService.voteById(volcanoId, userId);
    res.redirect('/volcanoes/details/' + volcanoId);
  } catch (error) {
    res.redirect('/404');
  }
});
export default volcanoController;
