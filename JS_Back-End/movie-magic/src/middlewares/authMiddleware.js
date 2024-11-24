import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';

export function isUser(req, res, next) {
  const token = req.cookies['auth'];
  if (!token) {
    return next();
  }
  const verified = jsonwebtoken.verify(token, process.env.SECRET);
  res.locals.email = verified.email;
  next();
}
