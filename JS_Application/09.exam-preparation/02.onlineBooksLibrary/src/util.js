import { logout } from './api/api.js';
import { page, render } from './lib.js';

const root = document.getElementById('site-content');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

function onLogout() {
  logout();
  removeUserData();
  updateNavigation();
  page('/');
}
export function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}
function setUserData(data) {
  const userData = {
    id: data._id,
    email: data.email,
    username: data.username,
    token: data.accessToken,
  };
  localStorage.setItem('userData', JSON.stringify(userData));
}

export function removeUserData() {
  localStorage.removeItem('userData');
}

export function updateNavigation() {
  const userData = getUserData();
  const user = document.getElementById('user');
  const guest = document.getElementById('guest');

  if (userData) {
    user.querySelector('span').textContent = `Welcome, ${userData.email}`;
    user.style.display = '';
    guest.style.display = 'none';
  } else {
    user.style.display = 'none';
    guest.style.display = '';
  }
}

export function decorateContext(ctx, next) {
  ctx.updateNavigation = updateNavigation;
  ctx.getUserData = getUserData;
  ctx.setUserData = setUserData;
  ctx.removeUserData = removeUserData;
  ctx.render = renderContext;

  next();
}
function renderContext(content) {
  render(content, root);
}
