import { Router } from 'express';

const volcanoController = Router();

volcanoController.get('/catalog', (req, res) => {
  res.render('volcano/catalog');
});
// POST

volcanoController.get('/create', (req, res) => {
  res.render('volcano/create');
});
// POST
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
