import { Router } from 'express';

export const router = Router();

router.get('/create', (req, res) => {
  res.render('cast-create');
});
