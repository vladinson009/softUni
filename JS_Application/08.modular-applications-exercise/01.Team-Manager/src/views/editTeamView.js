import { html } from '/lib.js';
import { getTeamById, editTeam } from '/api.js';

const editTeamTemplate = (team, onEdit, err) => html`<section id="edit">
  <article class="narrow">
    <header class="pad-med">
      <h1>Edit Team</h1>
    </header>
    <form @submit=${onEdit} id="edit-form" class="main-form pad-large">
      ${err ? html`<div class="error">${err}</div>` : null}

      <label>Team name:<input type="text" name="name" .value=${team.name} /></label>
      <label>Logo URL:<input type="text" name="logoUrl" .value=${team.logoUrl} /></label>
      <label
        >Description: <textarea name="description" .value=${team.description}></textarea>
      </label>
      <input class="action cta" type="submit" value="Save Changes" />
    </form>
  </article>
</section>`;

export async function showEditTeam(ctx) {
  const teamId = ctx.params.id;
  const team = await getTeamById(teamId);

  console.log(team);

  ctx.render(editTeamTemplate(team, onEdit));
  async function onEdit(e) {
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
      await editTeam(teamId, name, logoUrl, description);

      ctx.page.redirect('/browse-teams/details/' + teamId);
    } catch (error) {
      ctx.render(editTeamTemplate(team, onEdit, error.message));
    }
  }
}
