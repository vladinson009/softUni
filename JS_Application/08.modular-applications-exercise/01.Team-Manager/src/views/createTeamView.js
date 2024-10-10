import { showModal } from '/src/views/modal.js';
import { createTeam } from '/api.js';
import { html } from '/lib.js';

const createTeamTemplate = (onSubmit, error) => html`<section id="create">
  <article class="narrow">
    <header class="pad-med">
      <h1>New Team</h1>
    </header>
    <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
      ${error ? html`<div class="error">${error}</div>` : null}
      <label>Team name: <input type="text" name="name" /></label>
      <label>Logo URL: <input type="text" name="logoUrl" /></label>
      <label>Description: <textarea name="description"></textarea></label>
      <input class="action cta" type="submit" value="Create Team" />
    </form>
  </article>
</section>`;

export function showCreateTeam(ctx) {
  ctx.updateNavBar();
  ctx.render(createTeamTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name').trim();
    const logoUrl = form.get('logoUrl').trim();
    const description = form.get('description').trim();
    try {
      if (name.length < 4) {
        throw new Error('Team name require at least 4 characters');
      }
      if (logoUrl == '') {
        throw new Error('Logo URL is required field');
      }
      if (description.length < 10) {
        throw new Error('Description require at least 10 characters');
      }
      const newTeam = await createTeam(name, logoUrl, description);

      ctx.page.redirect('/browse-teams/details/' + newTeam._id);
    } catch (error) {
      showModal(ctx, error.message, createTeamTemplate(onSubmit));
    }
  }
}
