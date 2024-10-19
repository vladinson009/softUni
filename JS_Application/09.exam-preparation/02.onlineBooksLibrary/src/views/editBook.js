import { editBook, getBookById } from '../api/data.js';
import html from '../lib.js';

const editBookTemplate = (book, onSubmit) => html`<section id="edit-page" class="edit">
  <form @submit=${onSubmit} id="edit-form" action="#" method="">
    <fieldset>
      <legend>Edit my Book</legend>
      <p class="field">
        <label for="title">Title</label>
        <span class="input">
          <input type="text" name="title" id="title" .value=${book.title} />
        </span>
      </p>
      <p class="field">
        <label for="description">Description</label>
        <span class="input">
          <textarea name="description" id="description" .value=${book.description}></textarea>
        </span>
      </p>
      <p class="field">
        <label for="image">Image</label>
        <span class="input">
          <input type="text" name="imageUrl" id="image" .value=${book.imageUrl} />
        </span>
      </p>
      <p class="field">
        <label for="type">Type</label>
        <span class="input">
          <select id="type" name="type" .value=${book.type}>
            <option value="Fiction" selected>Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Mistery">Mistery</option>
            <option value="Classic">Clasic</option>
            <option value="Other">Other</option>
          </select>
        </span>
      </p>
      <input class="button submit" type="submit" value="Save" />
    </fieldset>
  </form>
</section>`;

export async function editBookPage(ctx) {
  const bookId = ctx.params.id;
  const book = await getBookById(bookId);

  ctx.render(editBookTemplate(book, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const title = form.get('title').trim();
    const description = form.get('description').trim();
    const imageUrl = form.get('imageUrl').trim();
    const type = form.get('type').trim();

    if (!title || !description || !imageUrl || !type) {
      return alert('All fields are required!');
    }
    await editBook(bookId, title, description, imageUrl, type);
    ctx.page.redirect('/details/' + bookId);
  }
}
