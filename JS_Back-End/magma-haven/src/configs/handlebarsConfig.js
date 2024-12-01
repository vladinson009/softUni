import hbs from 'express-handlebars';
// setup for handlebars
export default function hbsConfig(app) {
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
  app.engine('hbs', hbs.engine({ extname: 'hbs' }));
}
