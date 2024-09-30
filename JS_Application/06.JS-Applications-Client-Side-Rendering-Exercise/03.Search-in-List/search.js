import { towns } from './towns.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('towns');
const searchText = document.getElementById('searchText');
const result = document.getElementById('result');
document.querySelector('button').addEventListener('click', search);

const cityTemplates = (t) => html`<ul>
  ${t.map((el) => html`<li>${el}</li>`)}
</ul>`;

render(cityTemplates(towns), root);

const townsNodes = document.querySelectorAll('ul li');

function search() {
  const input = searchText.value.trim().toLocaleLowerCase();
  let matches = 0;
  for (let town of townsNodes) {
    if (input && town.textContent.toLocaleLowerCase().includes(input)) {
      town.classList.add('active');
      matches++;
    } else {
      town.classList.remove('active');
    }
    result.textContent = `${matches} matches found`;
  }
}
