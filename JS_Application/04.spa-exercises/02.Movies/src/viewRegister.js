import { updateNav } from './navBar.js';
import { host, url } from './restLinks.js';
import { showHome } from './viewHome.js';

const registerSection = document.getElementById('form-sign-up');
const form = registerSection.querySelector('form');
form.addEventListener('submit', onSubmit);
form.reset();
registerSection.remove();

export function showRegister() {
  const main = document.getElementById('main');
  main.replaceChildren(registerSection);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email').trim();
  const password = formData.get('password').trim();
  const repass = formData.get('repeatPassword').trim();

  if (!email || !password || !repass) {
    alert('All fields are required!');
    return;
  }
  if (password.length < 6) {
    alert('The password should be at least 6 characters long');
    return;
  }
  if (password != repass) {
    alert("Passwords don't match!");
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
    const response = await fetch(host + url.register, options);
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
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
