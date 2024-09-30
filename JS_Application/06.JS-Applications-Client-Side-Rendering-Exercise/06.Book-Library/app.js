import { render } from './node_modules/lit-html/lit-html.js';
import {
  mainViewTemplate,
  addBookTemplate,
  editBookTemplate,
} from './views.js';
import { deleteData, editData, getData, postData } from './api.js';

const body = document.body;

homeView();

export async function homeView() {
  render([mainViewTemplate(await getData()), addBookTemplate()], body);
}
async function editView(id, title, author) {
  render(
    [mainViewTemplate(await getData()), editBookTemplate(id, title, author)],
    body
  );
}

export async function onPost(e) {
  e.preventDefault();
  const t = e.target;
  const title = t.querySelector('input[name="title"]');
  const author = t.querySelector('input[name="author"]');
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  if (titleValue && authorValue) {
    await postData(authorValue, titleValue);
    await homeView();
    title.value = '';
    author.value = '';
  } else {
    return alert('all fields are required!');
  }
}
export async function onDelete(e) {
  const id = e.target.parentElement.id;
  const confirmation = confirm('Are you sure you want to delete?');
  if (confirmation) {
    await deleteData(id);
    await homeView();
  }
}
export async function onEdit(e) {
  const t = e.target;
  const tr = t.parentElement.parentElement.querySelectorAll('td');
  const title = tr[0].textContent;
  const author = tr[1].textContent;
  const id = tr[2].id;
  await editView(id, title, author);
}

export async function editBtn(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const id = formData.get('id');
  const title = formData.get('title');
  const author = formData.get('author');

  await editData(id, title, author);
  await homeView();
}
