import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { JWT_SIGNATURE } from '../constants.js';

const verifyAsync = promisify(jwt.verify);

export default async function isValidCookie(req, res, next) {
  if (req.cookies['auth']) {
    const token = req.cookies['auth'];

    try {
      const signature = await verifyAsync(token, JWT_SIGNATURE);
      res.locals.user = signature;
      res.locals.isAuthenticated = true;
    } catch (error) {
      return res.redirect('/user/logout');
    }
  } else {
    res.locals.isAuthenticated = false;
  }
  next();
}
