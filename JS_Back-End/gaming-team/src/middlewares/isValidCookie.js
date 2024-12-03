import { JWT_SECRET } from '../constants.js';
import jwt from '../libs/jwt.js';

export default async function isValidCookie(req, res, next) {
  if (req.cookies['auth']) {
    const token = req.cookies['auth'];
    try {
      const userData = await jwt.verify(token, JWT_SECRET);
      res.locals.user = userData;
      res.locals.isAuthenticated = true;
    } catch (error) {
      return res.redirect('/404');
    }
  } else {
    res.locals.isAuthenticated = false;
  }
  next();
}
