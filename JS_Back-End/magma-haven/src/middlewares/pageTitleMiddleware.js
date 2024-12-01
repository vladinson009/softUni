const titles = {
  '/': 'Home Page',
};

export default function pageTitle(req, res, next) {
  const title = titles[req.url];
  if (title != undefined) {
    res.locals.pageTitle = title;
  }
  next();
}
