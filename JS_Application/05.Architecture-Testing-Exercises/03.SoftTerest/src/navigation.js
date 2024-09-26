const nav = [...document.querySelectorAll('nav ul li')];

export function updateNav(userData) {
  if (userData()) {
    nav.forEach((el) => {
      if (el.className.includes('user')) {
        el.style.display = '';
      } else if (el.className.includes('guest')) {
        el.style.display = 'none';
      }
    });
  } else {
    userData('delete');
    nav.forEach((el) => {
      if (el.className.includes('guest')) {
        el.style.display = '';
      } else if (el.className.includes('user')) {
        el.style.display = 'none';
      }
    });
  }
}
