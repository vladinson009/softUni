import { Router } from 'express';
export const router = Router();

router.get('/about', (req, res) => {
  res.render('about');
});
