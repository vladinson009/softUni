import express from 'express';
import handlebars from 'express-handlebars';
import { router } from './router.js';

const app = express();
const PORT = 3000;
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

//setup for handlebars
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));

//setup for express
app.use(router);
app.all('*', (req, res) => res.render('404'));
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT} ...`));
