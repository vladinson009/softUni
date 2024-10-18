import { logout } from './api/api.js';
import { page, render } from './lib.js';
const root = document.querySelector('main');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

export function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}
export function setUserData(data) {
  const userData = {
    username: data.username,
    email: data.email,
    token: data.accessToken,
    id: data._id,
    gender: data.gender,
  };
  localStorage.setItem('userData', JSON.stringify(userData));
}
export function removeUserData() {
  localStorage.removeItem('userData');
}
export function updateNavigation() {
  const userData = getUserData();
  const user = document.querySelector('.user');
  const guest = document.querySelector('.guest');
  const welcomeMsg = user.querySelector('div span');

  if (userData != null) {
    user.style.display = '';
    guest.style.display = 'none';
    welcomeMsg.textContent = `Welcome, ${userData.email}`;
  } else {
    user.style.display = 'none';
    guest.style.display = '';
  }
}
export function decorateContext(ctx, next) {
  ctx.updateNavigation = updateNavigation;
  ctx.getUserData = getUserData;
  ctx.setUserData = setUserData;
  ctx.render = decorateRender;
  next();
}
function decorateRender(content) {
  render(content, root);
}

function onLogout() {
  try {
    logout();

    removeUserData();
    page.redirect('/');
  } catch (error) {
    return alert(error.message);
  }
}
