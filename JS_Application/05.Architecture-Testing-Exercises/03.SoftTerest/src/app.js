import { updateNav } from './navigation.js';
import { userData } from './userData.js';
import { showDashboard } from './views/dashboard.js';
import { showHome } from './views/home.js';
import { showCreate } from './views/create.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
const main = document.getElementById('main');
const nav = document.querySelector('nav');

nav.addEventListener('click', onNav);

//
updateNav(userData);
showHome(main);

const navigation = {
  Login: showLogin,
  Home: showHome,
  Register: showRegister,
  Dashboard: showDashboard,
  Create: showCreate,
  Logout: () => {
    userData('delete');
    updateNav(userData);
    showHome(main);
  },
};

function onNav(e) {
  e.preventDefault();
  const target = e.target;

  if (target.tagName == 'A') {
    const btn = target.textContent.trim();
    if (btn != '') {
      navigation[btn](main);
    } else {
      navigation['Home'](main);
    }
  } else if (target.tagName == 'IMG') {
    navigation['Home'](main);
  }
}
