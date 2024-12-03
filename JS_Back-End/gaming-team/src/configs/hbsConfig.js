import handlebars from 'express-handlebars';
// handlebars view engine & extension name Setup
export default function handlebarsConfig(app) {
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
  app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
}
