// Middleware guard for non-logged  users only
export function guestOnly(req, res, next) {
  if (res.locals.isAuthenticated) {
    return res.redirect('/404');
  }
  next();
}
// Middleware guard for logged users only
export function loggedOnly(req, res, next) {
  if (res.locals.isAuthenticated == false) {
    return res.redirect('/404');
  }
  next();
}
