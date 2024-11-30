const routeTitles = {
  '/': 'Home Page',
  '/about': 'About Us',
  '/search': 'Search Movie',
  '/users/login': 'Login User',
  '/users/register': 'Register User',
  '/movies/create': 'Create Movie',
  '/cast/create': 'Create Cast',
};

export function titleMiddleware(req, res, next) {
  let title = routeTitles[req.url];
  if (title != undefined) {
    res.locals.pageTitle = title;
  } else if (req.url.includes('/details')) {
    res.locals.pageTitle = 'Movie Details';
  } else if (req.url.includes('/edit')) {
    res.locals.pageTitle = 'Edit Movie';
  } else if (req.url.includes('/attach')) {
    res.locals.pageTitle = 'Attach Cast';
  }
  next();
}
