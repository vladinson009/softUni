const { homeView } = require('./controller/homeController');
const { serveStatic } = require('./controller/static');
const { addCatView } = require('./controller/addCatController');
const { editCatView } = require('./controller/editCatController');
const { addBreedView } = require('./controller/addBreedController');
const { newHome } = require('./controller/newHomeController');
const { searchBar } = require('./controller/homeSearchController');

module.exports = [
  homeView,
  serveStatic,
  addCatView,
  addBreedView,
  editCatView,
  newHome,
  searchBar,
];
