import { deleteMemeById, getMemeById } from '../api/data.js';
import { html } from '../lib.js';

const detailsTemplate = (data, isOwner, onDelete) => html`<section id="meme-details">
  <h1>Meme Title: ${data.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src=${data.imageUrl} />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${data.description}</p>

      ${isOwner
        ? html`<a class="button warning" href=${`/edit/` + data._id}>Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
        : null}
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const userData = ctx.getUserData();
  const memeId = ctx.params.id;
  const data = await getMemeById(memeId);
  const isOwner = userData && data._ownerId === userData.id;

  ctx.render(detailsTemplate(data, isOwner, onDelete));

  async function onDelete(e) {
    e.preventDefault();
    const confirmation = confirm(`Are you sure you want to delete "${data.title}" meme?`);
    if (confirmation) {
      await deleteMemeById(memeId);
      ctx.page.redirect('/catalog');
    } else {
      return;
    }
  }
}
