import jwt from '../utils/jwt.js';

export default async function isValidCookie(req, res, next) {
  try {
    const cookie = req.cookies.auth;
    if (cookie) {
      const verify = await jwt.verify(cookie, 'mysecret');
      res.locals.isAuthenticated = true;
      res.locals.user = verify;
    }
  } catch (error) {
    res.locals.isAuthenticated = false;
  }
  next();
}
