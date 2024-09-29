import { cats } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const allCats = document.getElementById('allCats');

const catTemplate = (cat) => html` <li>
  <img
    src="./images/${cat.imageLocation}.jpg"
    width="250"
    height="250"
    alt="Card image cap"
  />
  <div class="info">
    <button @click="${onReveal}" class="showBtn">Show status code</button>
    <div class="status" style="display: none" id=${cat.id}>
      <h4>Status Code: ${cat.statusCode}</h4>
      <p>${cat.statusMessage}</p>
    </div>
  </div>
</li>`;

const constructionTemplate = (cat) =>
  html`<ul>
    ${cat.map(catTemplate)}
  </ul>`;

function onReveal(e) {
  const t = e.target.parentElement.querySelector('div');
  t.style.display == 'none'
    ? (t.style.display = '')
    : (t.style.display = 'none');
}

render(constructionTemplate(cats), allCats);
