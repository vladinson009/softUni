import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
import showTitle from './middlewares/pageTitle.js';
import isValidCookie from './middlewares/isValidCookie.js';

//const handlebars = handlebars.engine('hbs', { extname: 'hbs'});

const app = express();
app.set('view engine', 'hbs');
app.set('views', 'src/views');
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
try {
  await mongoose.connect('mongodb://localhost:27017', { dbName: 'cosmic-explorer' });
  console.log('DB connected successfully!');
} catch (error) {
  console.log('DB failed!');
}
app.use('/css', express.static('css'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(showTitle);
app.use(isValidCookie);
//
app.use(routes);
app.listen(3000, () =>
  console.log('Server is listening on Server is listening on http://localhost:3030 ...')
);
