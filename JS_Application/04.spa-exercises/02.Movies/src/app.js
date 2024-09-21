import { updateNav } from './navBar.js';
import { onDelete, onEdit, onLike, onUnlike } from './userReaction.js';
import { movieDetail, movieExample } from './viewDetailsMovie.js';
import { movieContainer, showHome } from './viewHome.js';
import { showLogin, logout } from './viewLogin.js';
import { showRegister } from './viewRegister.js';

document.querySelector('nav').addEventListener('click', onNav);
movieContainer.addEventListener('click', onDetails);
movieExample.addEventListener('click', onInterraction);

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
function onDetails(e) {
  e.preventDefault();
  const target = e.target;
  const movieId = target.dataset.id;
  if (target.className.includes('detailsBtn')) {
    movieDetail(movieId);
  } else {
    return;
  }
}
function onInterraction(e) {
  e.preventDefault();
  const target = e.target;
  const movieId = target.parentElement.dataset.id;

  const interraction = {
    Like: onLike,
    Unlike: onUnlike,
    Edit: onEdit,
    Delete: onDelete,
  };
  if (target.tagName == 'A') {
    const action = interraction[target.textContent];
    if (typeof action == 'function') {
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData != null ? action(userData, movieId) : '';
    }
  }
}
