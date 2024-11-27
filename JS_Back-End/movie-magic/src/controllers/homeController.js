import { Router } from 'express';
import { getAll } from '../services/movieService.js';
export const router = Router();

router.get('/', async (req, res) => {
  const movies = await getAll().lean();
  res.render('home', { movies });
});
router.get('/search', async (req, res) => {
  const movies = await getAll().lean();

  res.render('home', { isSearch: true, movies });
});
router.get('/search/movies', async (req, res) => {
  const values = req.query;
  values.year = Number(values.year);
  const filter = {};

  if (values.title) {
    filter.title = { $regex: values.title, $options: 'i' };
  }
  if (values.genre) {
    filter.genre = { $regex: values.genre, $options: 'i' };
  }
  //TODO: search by year filter
  const movies = await getAll(filter).lean();

  res.render('home', { isSearch: true, movies, values });
});
