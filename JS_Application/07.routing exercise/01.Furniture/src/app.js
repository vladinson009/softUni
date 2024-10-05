import { page, render, updateUserNav, userData } from './util.js';
import { logout } from '/src/api.js';
import { showHome } from './views/homeView.js';
import { showLogin } from './views/loginView.js';
import { showRegister } from './views/registerView.js';
import { showCreate } from './views/createView.js';
import { showDetails } from './views/detailsView.js';
import { showEdit } from './views/editView.js';
import { showMyFurniture } from './views/myFurnitureView.js';

const root = document.querySelector('main');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

updateUserNav();

page(decorateContext);
page('/', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/my-furniture', showMyFurniture);

page.start();

function decorateContext(context, next) {
  context.render = (content) => render(content, root);
  context.userData = userData;
  next();
}

async function onLogout() {
  logout();
  page.redirect('/');
}
