import { updateNav } from './navBar.js';
import { host, url, main } from './restLinks.js';
import { showHome } from './viewHome.js';

const loginSection = document.getElementById('form-login');
const form = loginSection.querySelector('form');
form.addEventListener('submit', onSubmit);
form.reset();
loginSection.remove();

export function showLogin() {
  main.replaceChildren(loginSection);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email').trim();
  const password = formData.get('password').trim();
  if (!email || !password) {
    alert('All fields are required!');
    return;
  }
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(host + url.login, options);
    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    const userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken,
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    form.reset();
    updateNav();
    showHome();
  } catch (error) {
    throw alert(error.message);
  }
}

export async function logout() {
  try {
    const token = JSON.parse(localStorage.getItem('userData')).token;
    if (token) {
      const options = {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      };
      const response = await fetch(host + url.logout, options);
      localStorage.removeItem('userData');
      updateNav();
      showLogin();
    }
  } catch (err) {
    throw alert(err.message);
  }
}
