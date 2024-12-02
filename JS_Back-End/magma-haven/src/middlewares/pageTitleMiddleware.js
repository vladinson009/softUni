const titles = {
  '/': 'Home Page',
  '/volcanoes/catalog': 'Catalog Page',
  '/volcanoes/create': 'Create Page',
  '/volcanoes/search': 'Search',
  '/user/login': 'Login Page',
  '/user/register': 'Register Page',
};

export default function pageTitle(req, res, next) {
  const title = titles[req.url];
  if (title != undefined) {
    res.locals.pageTitle = title;
  } else if (req.url.includes('/volcanoes/details')) {
    res.locals.pageTitle = 'Details Page';
  } else if (req.url.includes('/volcanoes/edit')) {
    res.locals.pageTitle = 'Edit Page';
  } else if (req.url.includes('/volcanoes/search/filter')) {
    res.locals.pageTitle = 'Search';
  }
  next();
}
