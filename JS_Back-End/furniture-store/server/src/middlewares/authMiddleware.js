import jwt from 'jsonwebtoken';
export default function authMiddleware(req, res, next) {
  const token = req.header('X-Authorization');

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, 'secret');

    req.user = decodedToken;
    req.isAuthenticated = true;

    next();
  } catch (err) {
    res.status(401).end();
  }
}
