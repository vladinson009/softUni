export function guestOnly(req, res, next) {
  if (res.locals.isAuthenticated) {
    return res.redirect('/404');
  }
  next();
}

export function loggedOnly(req, res, next) {
  if (res.locals.isAuthenticated == false) {
    return res.redirect('/404');
  }
  next();
}
