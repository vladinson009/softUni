import { render } from '/lib.js';

const root = document.querySelector('main');

export function userData(method, data) {
  if (method == 'get') {
    return JSON.parse(localStorage.getItem('userData'));
  } else if (method == 'set') {
    const userData = {
      email: data.email,
      username: data.username,
      token: data.accessToken,
      id: data._id,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  } else if (method == 'remove') {
    localStorage.removeItem('userData');
  }
}
export function updateNavBar() {
  const localStorage = userData('get');
  const navigation = [...document.querySelectorAll('nav a')];
  if (localStorage) {
    navigation.forEach((el) => {
      el.classList.contains('user')
        ? (el.style.display = '')
        : el.classList.contains('guest')
        ? (el.style.display = 'none')
        : null;
    });
  } else {
    navigation.forEach((el) => {
      el.classList.contains('guest')
        ? (el.style.display = '')
        : el.classList.contains('user')
        ? (el.style.display = 'none')
        : null;
    });
  }
}
export function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateNavBar = updateNavBar;
  ctx.userData = userData;
  next();
}
