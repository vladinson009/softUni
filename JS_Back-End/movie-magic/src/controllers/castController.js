import { Router } from 'express';
import { createCast } from '../services/castService.js';

export const router = Router();

router.get('/create', (req, res) => {
  res.render('cast-create');
});
router.post('/create', async (req, res) => {
  const body = req.body;
  try {
    await createCast(body);
  } catch (error) {
    console.log(error);

    res.render('cast-create', { body, err: error.message });
    return;
  }
  res.redirect('/');
});
