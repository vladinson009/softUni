const titles = {
  '/': 'Home Page',
  '/volcanoes/catalog': 'Catalog Page',
  '/volcanoes/create': 'Create Page',
  '/volcanoes/details': 'Details Page',
  '/volcanoes/edit': 'Edit Page',
  '/volcanoes/search': 'Search',
  '/user/login': 'Login Page',
  '/user/register': 'Register Page',
};

export default function pageTitle(req, res, next) {
  const title = titles[req.url];
  if (title != undefined) {
    res.locals.pageTitle = title;
  }
  next();
}
