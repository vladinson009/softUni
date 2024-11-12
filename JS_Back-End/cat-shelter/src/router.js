const { homeView } = require('./controller/homeController');
const { serveStatic } = require('./controller/static');
const { addCatView } = require('./controller/addCatController');
const { editCatView } = require('./controller/editCatController');
const { addBreedView } = require('./controller/addBreedController');

module.exports = [homeView, serveStatic, addCatView, addBreedView, editCatView];
