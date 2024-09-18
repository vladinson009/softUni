import { updateNav } from './navBar.js';
import { showHome } from './viewHome.js';
import { showLogin, logout } from './viewLogin.js';
import { showRegister } from './viewRegister.js';

document.querySelector('nav').addEventListener('click', onNav);

const navOptions = {
  homeLink: showHome,
  loginLink: showLogin,
  registerLink: showRegister,
  logoutBtn: logout,
};

updateNav();
showHome();

function onNav(e) {
  e.preventDefault();
  const id = e.target.id;
  const action = navOptions[id];
  if (typeof action == 'function') {
    action();
  }
}

/**
 * TASKS TO DO
 *
 * - Add Movie
 * Logged-in users should be able to add movie.
 * - Movie Details
 * Logged-in users should be able to view details about movies.
 * - Edit Movie
 * Logged-in users should be able to edit movies, added by them.
 * - Like Movie
 * Logged-in users should be able to like movie, added by other user.
 * - Delete Movie
 * Logged-in users should be able to delete their movies.
 */
