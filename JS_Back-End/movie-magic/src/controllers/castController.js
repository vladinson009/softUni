import { Router } from 'express';
import { createCast, getCastWithout } from '../services/castService.js';
import { attachCast, getById } from '../services/movieService.js';
import { parseError } from '../util/errorParser.js';
export const router = Router();

router.get('/create', (req, res) => {
  res.render('cast/cast-create');
});
router.post('/create', async (req, res) => {
  const body = req.body;
  try {
    await createCast(body);
  } catch (error) {
    const err = parseError(error);

    res.render('cast/cast-create', { body, err });
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
  try {
    console.log(cast);

    if (!cast) {
      throw new Error('Please select a cast!');
    }
    await attachCast(movieId, cast, nameInMovie);
    res.redirect(`/movies/${movieId}/details`);
  } catch (error) {
    const movie = await getById(movieId).lean();
    const cast = await getCastWithout(movie.cast).lean();
    const err = parseError(error);
    return res.render('cast/cast-attach', { movie, cast, err, nameInMovie });
  }
});
