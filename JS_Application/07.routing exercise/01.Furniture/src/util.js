import { render, html } from '/node_modules/lit-html/lit-html.js';
import { until } from '/node_modules/lit-html/directives/until.js';
import page from '/node_modules/page/page.mjs';

function userData(method = 'get', data) {
  if (method == 'get') {
    const userData = localStorage.getItem('userData');
    if (userData != null) {
      return JSON.parse(userData);
    } else {
      return false;
    }
  } else if (method == 'set') {
    const dataSetting = {
      email: data.email,
      id: data._id,
      token: data.accessToken,
    };
    localStorage.setItem('userData', JSON.stringify(dataSetting));
  } else if (method == 'remove') {
    localStorage.removeItem('userData');
  }
}
function updateUserNav() {
  const user = document.getElementById('user');
  const guest = document.getElementById('guest');
  if (userData()) {
    user.style.display = 'inline-block';
    guest.style.display = 'none';
  } else {
    user.style.display = 'none';
    guest.style.display = 'inline-block';
  }
}
export { render, html, page, until, userData, updateUserNav };
