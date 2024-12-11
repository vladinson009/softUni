const titles = {
  '/': 'Cosmic Explorer',
  '/404': '404 - Page Not Found',
  '/planets/catalog': 'Planet Catalog',
  '/planets/create': 'Add New Planet',
  '/planets/details': 'Planet Details',
  '/planets/edit': 'Edit Planet',
  '/users/login': 'Login',
  '/users/register': 'Register',
};

export default function showTitle(req, res, next) {
  const title = titles[req.url];
  if (title) {
    res.locals.pageTitle = title;
  }
  next();
}
