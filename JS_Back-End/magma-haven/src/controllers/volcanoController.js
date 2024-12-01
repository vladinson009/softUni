import { Router } from 'express';
import { loggedOnly } from '../middlewares/guardsMiddleware.js';
import volcanoService from '../services/volcanoService.js';
import { errorParser } from '../utils/errorParser.js';
import parseOpt from '../utils/volcanoOptParser.js';
const volcanoController = Router();
const opt = ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'];

volcanoController.get('/catalog', (req, res) => {
  res.render('volcano/catalog');
});
// POST

volcanoController.get('/create', loggedOnly, (req, res) => {
  const options = parseOpt(opt, req.body.typeVolcano);
  res.render('volcano/create', { options });
});
volcanoController.post('/create', async (req, res) => {
  try {
    await volcanoService.create(req.body);
  } catch (err) {
    const error = errorParser(err);
    const options = parseOpt(opt, req.body.typeVolcano);

    return res.render('volcano/create', { volcanoData: req.body, options, error });
  }
  console.log(Object.values(req.body));
});
volcanoController.get('/details', (req, res) => {
  res.render('volcano/details');
});
// POST
volcanoController.get('/edit', (req, res) => {
  res.render('volcano/edit');
});
// POST
volcanoController.get('/search', (req, res) => {
  res.render('volcano/search');
});
// POST
export default volcanoController;
