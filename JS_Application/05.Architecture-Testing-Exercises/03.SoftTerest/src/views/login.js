import { login } from '../api.js';
import { updateNav } from '../navigation.js';
import { userData } from '../userData.js';
import { showHome } from './home.js';

const section = document.getElementById('loginLink');
section.remove();

const form = section.querySelector('#loginForm');
form.addEventListener('submit', onLogin);
export function showLogin(main) {
  main.replaceChildren(section);
}

async function onLogin(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');

  await login(email, password);
  form.reset();

  updateNav(userData);
  showHome(document.getElementById('main'));
}