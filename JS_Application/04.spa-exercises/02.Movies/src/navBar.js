const navBar = [...document.querySelectorAll('nav li')];
const welcomeMsg = document.getElementById('welcomeMsg');

export function updateNav() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData != null) {
    welcomeMsg.textContent = `Welcome, ${userData.email}`;
    navBar.forEach((el) => {
      if (el.classList.contains('guest')) {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }
    });
  } else {
    navBar.forEach((el) => {
      if (el.classList.contains('guest')) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }
}
