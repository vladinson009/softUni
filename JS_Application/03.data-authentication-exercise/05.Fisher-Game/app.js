const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');
const main = document.querySelector('main');

const aHome = document.getElementById('home');
const aLogin = document.getElementById('login');
const aRegister = document.getElementById('register');
const aLogout = document.getElementById('logout');

aRegister.addEventListener('click', onRegister);

checkLocalStorage();

function onRegister(ev) {
  ev.preventDefault();
  const section = document.createElement('section');
  section.id = 'register-view';
  section.innerHTML = `
    <h2>Register</h2>
        <form id="registerForm">
          <label>Email: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <label>Repeat: <input type="password" name="rePass" /></label>
          <p class="notification"></p>
          <button id="registerBtn">Register</button>
        </form>`;
  views.replaceChildren(section);

  const registerBtn = document.getElementById('registerBtn');
  registerBtn.addEventListener('click', register);
}

async function register(event) {
  try {
    event.preventDefault();
    const url = 'http:localhost:3030/users/register';

    const formData = new FormData(document.getElementById('registerForm'));
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email == '' || password == '' || rePass == '') {
      throw new Error('All fields are required!');
    } else if (password != rePass) {
      formData.set('password', '');
      formData.set('rePass', '');
      throw new Error("Passwords don't match!");
    } else if (!email.includes('@')) {
      throw new Error('Invalid Email!\nPlease check your email again');
    }
    const body = {
      email,
      password,
      rePass,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err.message;
  }
}

function checkLocalStorage() {
  if (localStorage.getItem('data') == null) {
    userNav.style.display = 'none';
    guestNav.style.display = 'inline-block';
  } else {
    userNav.style.display = 'inline-block';
    guestNav.style.display = 'none';
  }
}
/// NOT FINISHED YET
// PROBLEM WITH THE LOCAL SERVER
