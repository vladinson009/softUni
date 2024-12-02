export function loggedOnly(req, res, next) {
  if (res.locals.isAuthenticated == false) {
    return res.redirect('/404');
  }
  next();
}
export function guestOnly(req, res, next) {
  if (res.locals.isAuthenticated == true) {
    return res.redirect('/404');
  }
  next();
}
