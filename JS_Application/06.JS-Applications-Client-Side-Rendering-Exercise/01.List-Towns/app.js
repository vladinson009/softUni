import { render, html } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const inputField = document.getElementById('towns');
document.getElementById('btnLoadTowns').addEventListener('click', onClick);

const townsTemplate = (data) =>
  html` <ul>${data.map((el) => html`<li>${el}</ul>`)}</li> `;

function onClick(e) {
  e.preventDefault();
  const showTowns = inputField.value
    .split(',')
    .map((e) => e.trim())
    .filter((e) => e.length > 0);
  render(townsTemplate(showTowns), root);
}
