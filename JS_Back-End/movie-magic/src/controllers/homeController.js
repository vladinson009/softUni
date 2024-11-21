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
  const movies = Object.values(await getAll()).filter((movie) => {
    if (
      movie.title.toLowerCase().includes(values.title.toLowerCase()) &&
      movie.genre.toLowerCase().includes(values.genre.toLowerCase()) &&
      movie.year.toLowerCase().includes(values.year.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  });

  res.render('home', { isSearch: true, movies, values });
});
