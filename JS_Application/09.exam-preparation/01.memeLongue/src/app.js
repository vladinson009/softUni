import { updateNavigation, decorateContext } from './util.js';
import { page } from './lib.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createMemePage } from './views/createMeme.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/detailsMeme.js';
import { editPage } from './views/editMeme.js';
import { profilePage } from './views/profile.js';

updateNavigation();

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createMemePage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);
page.start();
