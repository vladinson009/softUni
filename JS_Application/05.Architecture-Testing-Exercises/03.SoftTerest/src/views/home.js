import { showRegister } from './register.js';

const section = document.getElementById('homeLink');
const getStartedLink = section.querySelector('a');
section.remove();

export function showHome(main) {
  main.replaceChildren(section);
  getStartedLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister(main);
  });
}
