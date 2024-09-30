import { html, render } from './node_modules/lit-html/lit-html.js';

const tbody = document.querySelector('tbody');
const searchField = document.getElementById('searchField');
document.querySelector('#searchBtn').addEventListener('click', onClick);

getStudents();

const tableRowsTemplate = (data) => html` <tr>
  <td>${data.firstName} ${data.lastName}</td>
  <td>${data.email}</td>
  <td>${data.course}</td>
</tr>`;

async function onClick() {
  const input = searchField.value.toLocaleLowerCase().trim();
  const td = document.querySelectorAll('tbody tr');
  for (let el of td) {
    if (input && el.textContent.toLocaleLowerCase().includes(input)) {
      el.classList.add('select');
    } else {
      el.classList.remove('select');
    }
  }
  searchField.value = '';
}

async function getStudents() {
  const response = await fetch(
    ' http://localhost:3030/jsonstore/advanced/table'
  );
  const data = Object.values(await response.json());
  const students = data.map(tableRowsTemplate);
  render(students, tbody);
}
