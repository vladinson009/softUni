import { Router } from 'express';
import { create, getById } from '../services/movieService.js';
import { isGuestGuard } from '../middlewares/authMiddleware.js';
export const router = Router();
router.get('/create', isGuestGuard, (req, res) => {
  res.render('create');
});
router.post('/create', isGuestGuard, async (req, res) => {
  const data = Object.entries(req.body).reduce((acc, [k, v]) => {
    acc[k] = v.trim();
    return acc;
  }, {});
  const { title, genre, director, year, imageUrl, rating, description } = data;
  const isEmptyField = Object.values(data).some((el) => el == '');
  try {
    if (isEmptyField) {
      throw new Error('All fields are required');
    }
    if (rating < 1 && rating > 10) {
      throw new Error('Rating must be between 1 and 10');
    }
    await create({ title, genre, director, year, imageUrl, rating, description });
  } catch (error) {
    return res.render('create', { err: error.message, movie: data });
  }
  res.redirect('/');
});
router.get('/:movieId/details', async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await getById(movieId).populate('cast.cast').lean();
  movie.ratingStars = '&#x2605;'.repeat(Math.floor(movie.rating / 2));
  res.render('details', { movie });
});
