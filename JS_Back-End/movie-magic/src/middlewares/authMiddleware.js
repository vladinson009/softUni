import jsonwebtoken from 'jsonwebtoken';
export function isUserGuard(req, res, next) {
  const token = req.cookies['auth'];
  if (!token) {
    return next();
  }
  const verified = jsonwebtoken.verify(token, process.env.SECRET);
  if (!verified) {
    return next();
  }

  res.redirect('/');
}
export function isGuestGuard(req, res, next) {
  const token = req.cookies['auth'];
  if (token) {
    return next();
  }
  res.redirect('/users/login');
}
export function isToken(req, res, next) {
  const token = req.cookies['auth'];
  if (!token) {
    return next();
  }
  const verified = jsonwebtoken.verify(token, process.env.SECRET);
  if (!verified) {
    res.clearCookie('auth');
    res.redirect('/users/login');
  }
  res.locals.email = verified.email;
  next();
}
