import { html, render } from './node_modules/lit-html/lit-html.js';

const select = document.getElementById('menu');
const itemText = document.getElementById('itemText');

document.querySelector('form').addEventListener('submit', addItem);

renderOptions();

const dropdownTemplate = (unit) =>
  html`<option .value=${unit._id}>${unit.text}</option>`;

async function addItem(e) {
  e.preventDefault();
  await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: itemText.value.trim() }),
  });
  itemText.value = '';
  renderOptions();
}

async function renderOptions() {
  try {
    const response = await fetch(
      'http://localhost:3030/jsonstore/advanced/dropdown'
    );
    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = Object.values(await response.json());
    render(data.map(dropdownTemplate), select);
  } catch (error) {
    alert(error.message);
    throw error.message;
  }
}
