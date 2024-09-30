import { html } from './node_modules/lit-html/lit-html.js';
import { onPost, onEdit, onDelete, editBtn, homeView } from './app.js';

export const mainViewTemplate = (data) => html`<button
    @click=${homeView}
    id="loadBooks"
  >
    LOAD ALL BOOKS
  </button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${data.map(
        ([k, v]) => html` <tr>
          <td>${v.title}</td>
          <td>${v.author}</td>
          <td id=${k}>
            <button @click=${onEdit}>Edit</button>
            <button @click=${onDelete}>Delete</button>
          </td>
        </tr>`
      )}
    </tbody>
  </table>`;

export const addBookTemplate = () => html`<form @submit=${onPost} id="add-form">
  <h3>Add book</h3>
  <label>TITLE</label>
  <input type="text" name="title" placeholder="Title..." />
  <label>AUTHOR</label>
  <input type="text" name="author" placeholder="Author..." />
  <input type="submit" value="Submit" />
</form>`;

export const editBookTemplate = (id, title, author) => html` <form
  @submit=${editBtn}
  id="edit-form"
>
  <input type="hidden" name="id" .value=${id} />
  <h3>Edit book</h3>
  <label>TITLE</label>
  <input type="text" name="title" placeholder="Title..." .value=${title} />
  <label>AUTHOR</label>
  <input type="text" name="author" placeholder="Author..." .value=${author} />
  <input type="submit" value="Save" />
</form>`;
