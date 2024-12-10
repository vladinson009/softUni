export function isGuest(req, res, next) {
  const token = req.header('X-Authorization');
  if (token) {
    return res.status(401).json({ message: 'Can not access this page as logged in user!' });
  }
  next();
}
export function isLogged(req, res, next) {
  const token = req.header('X-Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Can not acces this page as a guest!' });
  }
  next();
}
