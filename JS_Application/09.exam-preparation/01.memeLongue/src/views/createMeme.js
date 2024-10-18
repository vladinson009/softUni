import { createMeme } from '../api/data.js';
import { html } from '../lib.js';
import { modal } from './notify.js';

const createMemeTemplate = (onSubmit) => html`<section id="create-meme">
  <form @submit=${onSubmit} id="create-form">
    <div class="container">
      <h1>Create Meme</h1>
      <label for="title">Title</label>
      <input id="title" type="text" placeholder="Enter Title" name="title" />
      <label for="description">Description</label>
      <textarea id="description" placeholder="Enter Description" name="description"></textarea>
      <label for="imageUrl">Meme Image</label>
      <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl" />
      <input type="submit" class="registerbtn button" value="Create Meme" />
    </div>
  </form>
</section>`;

export function createMemePage(ctx) {
  ctx.render(createMemeTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const title = form.get('title').trim();
    const description = form.get('description').trim();
    const imageUrl = form.get('imageUrl').trim();

    if (!title || !description || !imageUrl) {
      return modal('All fields are reuqired!');
    }
    try {
      await createMeme(title, description, imageUrl);
      ctx.page.redirect('/catalog');
    } catch (error) {
      return modal(error.message);
    }
  }
}
