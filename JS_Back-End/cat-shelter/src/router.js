const { homeView } = require('./controller/homeController');
const { serveStatic } = require('./controller/static');
const { addCatView } = require('./controller/addCatController');

module.exports = [homeView, serveStatic, addCatView];
