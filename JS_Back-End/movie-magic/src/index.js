import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { router } from './router.js';
import 'dotenv/config.js';

const connectionStr = process.env.DB_URL;
const PORT = 3000;

const app = express();
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

//setup for handlebars
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));

//setup for express
app.use(router);
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT} ...`));

//setup for mongoose
try {
  await mongoose.connect(connectionStr);
  console.log('connected to DB');
} catch (error) {
  console.log(error);
}
