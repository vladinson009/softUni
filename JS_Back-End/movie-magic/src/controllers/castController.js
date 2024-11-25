import { Router } from 'express';
import { createCast, getCastWithout } from '../services/castService.js';
import { attachCast, getById } from '../services/movieService.js';
export const router = Router();

router.get('/create', (req, res) => {
  res.render('cast/cast-create');
});
router.post('/create', async (req, res) => {
  const body = req.body;
  try {
    await createCast(body);
  } catch (error) {
    console.log(error);

    res.render('cast/cast-create', { body, err: error.message });
    return;
  }
  res.redirect('/');
});
router.get('/:movieId/attach', async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await getById(movieId).lean();
  const cast = await getCastWithout(movie.cast).lean();

  res.render('cast/cast-attach', { movie, cast });
});
router.post('/:movieId/attach', async (req, res) => {
  const movieId = req.params.movieId;
  const { nameInMovie, cast } = req.body;
  await attachCast(movieId, cast, nameInMovie);
  res.redirect(`/movies/${movieId}/details`);
});
