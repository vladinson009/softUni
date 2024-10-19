import { page } from './lib.js';
import { decorateContext, updateNavigation } from './util.js';
import { createBookPage } from './views/addBooks.js';
import { bookDetailsPage } from './views/bookDetails.js';
import { dashboardPage } from './views/dashboard.js';
import { editBookPage } from './views/editBook.js';
import { loginPage } from './views/login.js';
import { myBooksPage } from './views/myBooks.js';
import { registerPage } from './views/register.js';

updateNavigation();

page(decorateContext);
page('/', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/add-books', createBookPage);
page('/details/:id', bookDetailsPage);
page('/edit/:id', editBookPage);
page('/my-books', myBooksPage);

page.start();
