import { createBook } from '../api/data.js';
import html from '../lib.js';

const addBookTemplate = (onSubmit) => html` <section id="create-page" class="create">
  <form @submit="${onSubmit}id" ="create-form" action="" method="">
    <fieldset>
      <legend>Add new Book</legend>
      <p class="field">
        <label for="title">Title</label>
        <span class="input">
          <input type="text" name="title" id="title" placeholder="Title" />
        </span>
      </p>
      <p class="field">
        <label for="description">Description</label>
        <span class="input">
          <textarea name="description" id="description" placeholder="Description"></textarea>
        </span>
      </p>
      <p class="field">
        <label for="image">Image</label>
        <span class="input">
          <input type="text" name="imageUrl" id="image" placeholder="Image" />
        </span>
      </p>
      <p class="field">
        <label for="type">Type</label>
        <span class="input">
          <select id="type" name="type">
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Mistery">Mistery</option>
            <option value="Classic">Clasic</option>
            <option value="Other">Other</option>
          </select>
        </span>
      </p>
      <input class="button submit" type="submit" value="Add Book" />
    </fieldset>
  </form>
</section>`;

export function createBookPage(ctx) {
  ctx.render(addBookTemplate(onSubmit));

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
    await createBook(title, description, imageUrl, type);
    ctx.page.redirect('/');
  }
}
