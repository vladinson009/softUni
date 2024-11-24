import handlebars from 'express-handlebars';

export default function handlebarsConfig(app) {
  //setup for handlebars
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
  app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
}
