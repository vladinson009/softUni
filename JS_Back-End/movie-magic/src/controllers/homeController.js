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
  let moviesQuery = getAll();
  const values = req.query;
  values.year = Number(values.year);

  if (values.title) {
    moviesQuery.find({ title: { $regex: values.title, $options: 'i' } });
  }
  if (values.genre) {
    moviesQuery.find({ genre: { $regex: values.genre, $options: 'i' } });
  }
  if (values.year) {
    moviesQuery.find({ year: values.year });
  }
  const movies = await moviesQuery.lean();
  res.render('home', { isSearch: true, movies, values });
});
