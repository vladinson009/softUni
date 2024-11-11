const { homeView } = require('./controller/homeController');
const { serveStatic } = require('./controller/static');
const { addCatView } = require('./controller/addCatController');
const { addBreedView } = require('./controller/addBreedController');

module.exports = [homeView, serveStatic, addCatView, addBreedView];
