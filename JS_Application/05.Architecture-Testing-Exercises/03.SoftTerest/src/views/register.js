import { register } from '../api.js';
import { updateNav } from '../navigation.js';
import { userData } from '../userData.js';
import { showHome } from './home.js';

const section = document.getElementById('registerLink');
section.remove();

const form = section.querySelector('#registerForm');
form.addEventListener('submit', onRegister);

export function showRegister(main) {
  main.replaceChildren(section);
}

export async function onRegister(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  const repass = formData.get('repeatPassword');

  const symbolRequirements = /[!@#$%^&*(),.?":{}|<>_\\\-]/.test(email);
  const includesDigits = /\d/.test(email);

  const validEmail = email.length >= 3 && symbolRequirements && includesDigits;
  const validPassword = password.length >= 3;
  const equalPasswords = password == repass;

  if (validEmail == false) {
    return alert(
      'The email should be at least 3 characters long, have digits and special characters'
    );
  } else if (validPassword == false) {
    return alert('The password should be at least 3 characters long ');
  } else if (equalPasswords == false) {
    return alert("Passwords don't match");
  } else {
    await register(email, password);
    form.reset();
    updateNav(userData);
    showHome(document.getElementById('main'));
  }
}
