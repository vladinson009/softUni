import uniqid from 'uniqid';
import { Router } from 'express';
import { Movie } from '../Models/MovieModel.js';
import { create, getById } from '../services/movieService.js';
export const router = Router();
router.get('/create', (req, res) => {
  res.render('create');
});
router.post('/create', async (req, res) => {
  const data = Object.entries(req.body).reduce((acc, [k, v]) => {
    acc[k] = v.trim();
    return acc;
  }, {});
  const { title, genre, director, year, imageUrl, rating, description } = data;
  const id = uniqid();
  const movie = new Movie(id, title, genre, director, year, imageUrl, rating, description);
  const isEmptyField = Object.values(data).some((el) => el == '');
  try {
    if (isEmptyField) {
      throw new Error('All fields are required');
    }
    if (movie.rating < 1 && movie.rating > 10) {
      throw new Error('Rating must be between 1 and 10');
    }
    await create(movie);
  } catch (error) {
    return res.render('create', { err: error.message, movie });
  }
  res.redirect('/');
});
router.get('/:movieId/details', async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await getById(movieId);
  movie.ratingStars = '&#x2605;'.repeat((Math.floor(movie.rating / 2)));
  res.render('details', { movie });
});
