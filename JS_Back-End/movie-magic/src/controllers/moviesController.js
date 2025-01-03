import { Router } from 'express';
import { create, deleteById, getById, updateById } from '../services/movieService.js';
import { isGuestGuard } from '../middlewares/authMiddleware.js';
import { parseError } from '../util/errorParser.js';
export const router = Router();
router.get('/create', isGuestGuard, (req, res) => {
  res.render('movie/create');
});
router.post('/create', isGuestGuard, async (req, res) => {
  const ownerId = res.locals?._id;
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
    if (rating < 1 && rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    const data = { title, genre, director, year, imageUrl, rating, description };
    if (ownerId) {
      data.ownerId = ownerId;
    }
    await create(data);
  } catch (error) {
    const err = parseError(error);
    return res.render('movie/create', { err, movie: data });
  }
  res.redirect('/');
});
router.get('/:movieId/details', async (req, res) => {
  const movieId = req.params.movieId;

  const userId = res.locals?._id;
  const movie = await getById(movieId).populate('cast.cast').lean();
  const isOwner = userId && userId == movie.ownerId?.toString();

  movie.ratingStars = '&#x2605;'.repeat(Math.floor(movie.rating));
  movie.isOwner = isOwner;
  res.render('movie/details', { movie });
});
router.get('/:movieId/edit', isGuestGuard, async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await getById(movieId).lean();

  res.render('movie/edit', { ...movie });
});
router.post('/:movieId/edit', isGuestGuard, async (req, res) => {
  const movieId = req.params.movieId;
  const newData = req.body;
  try {
    await updateById(movieId, newData);
    res.redirect(`/movies/${movieId}/details`);
  } catch (error) {
    const err = parseError(error);
    res.render('movie/edit', { ...newData, err });
  }
});
router.get('/:movieId/delete', isGuestGuard, async (req, res) => {
  const movieId = req.params.movieId;
  try {
    await deleteById(movieId);
    res.redirect('/');
  } catch (error) {
    res.redirect('404');
  }
});
