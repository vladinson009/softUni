import { editMemeById, getMemeById } from '../api/data.js';
import { html } from '../lib.js';
import { modal } from './notify.js';

const editTemplate = (data, onSubmit) => html`<section id="edit-meme">
  <form @submit=${onSubmit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
      <label for="title">Title</label>
      <input id="title" type="text" placeholder="Enter Title" name="title" .value=${data.title} />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
        .value=${data.description}
      ></textarea>
      <label for="imageUrl">Image Url</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter Meme ImageUrl"
        name="imageUrl"
        .value=${data.imageUrl}
      />
      <input type="submit" class="registerbtn button" value="Edit Meme" />
    </div>
  </form>
</section>`;

export async function editPage(ctx) {
  const memeId = ctx.params.id;
  const data = await getMemeById(memeId);

  ctx.render(editTemplate(data, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const title = form.get('title').trim();
    const description = form.get('description').trim();
    const imageUrl = form.get('imageUrl').trim();

    if (!title || !description || !imageUrl) {
      return modal('All fields are requred!');
    }
    const body = { title, description, imageUrl };
    await editMemeById(memeId, body);
    ctx.page.redirect('/details/' + memeId);
  }
}
