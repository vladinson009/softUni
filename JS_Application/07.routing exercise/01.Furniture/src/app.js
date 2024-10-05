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
page('/dashboard', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/my-furniture', showMyFurniture);

page.start();

function decorateContext(context, next) {
  context.userData = userData;
  context.render = (content) => render(content, root);
  const path = context.pathname;
  updateActiveNav(path);
  next();
}
function updateActiveNav(path) {
  const nav = document.querySelectorAll('header a');
  nav.forEach((el) => {
    if (el.getAttribute('href') == path && el.getAttribute('href') != '/') {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
async function onLogout() {
  logout();
  page.redirect('/');
}
