import { page, decorateContext } from '/src/util.js';
import { logout } from '/src/api.js';
import { showHome } from '/src/views/homeView.js';
import { showLogin } from '/src/views/loginView.js';
import { showRegister } from '/src/views/registerView.js';
import { showCreate } from '/src/views/createView.js';
import { showDetails } from '/src/views/detailsView.js';
import { showEdit } from '/src/views/editView.js';
import { showMyFurniture } from '/src/views/myFurnitureView.js';

document.getElementById('logoutBtn').addEventListener('click', async () => {
  page.redirect('/');
  logout();
});

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
