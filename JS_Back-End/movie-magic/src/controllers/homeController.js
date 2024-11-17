import { Router } from 'express';
import { getAll } from '../services/movieService.js';
export const router = Router();

router.get('/', async (req, res) => {
  const movies = await getAll();
  res.render('home', { movies });
});
router.get('/search', async (req, res) => {
  const movies = await getAll();

  res.render('home', { isSearch: true, movies });
});
