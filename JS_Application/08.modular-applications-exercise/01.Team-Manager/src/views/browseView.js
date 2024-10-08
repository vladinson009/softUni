import { getAllTeams, getPartyMembers, getAllMembers } from '/api.js';
import { html } from '/lib.js';

const browseTemplate = (isUser, teams) => html`<section id="browse">
  <article class="pad-med">
    <h1>Team Browser</h1>
  </article>
  ${isUser
    ? html`<article class="layout narrow">
        <div class="pad-small"><a href="/create-team" class="action cta">Create Team</a></div>
      </article>`
    : null}
  ${teams}
</section>`;

const teamCards = (promiseTeams, members) => html`<article class="layout">
  <img src=${promiseTeams.logoUrl} class="team-logo left-col" />
  <div class="tm-preview">
    <h2>${promiseTeams.name}</h2>
    <p>${promiseTeams.description}</p>
    <span class="details">${members} Members</span>
    <div><a href="/browse-teams/details/${promiseTeams._id}" class="action">See details</a></div>
  </div>
</article>`;

export async function showBrowseTeams(ctx) {
  const allTeams = await getAllTeams();
  const allMembers = await getAllMembers();

  //const teams = allTeams.map(teamCards);
  const teams = allTeams.map((el) => {
    const countMember = allMembers.filter((filter) => filter.teamId == el._id).length;
    return teamCards(el, countMember);
  });

  ctx.updateNavBar();
  ctx.render(browseTemplate(ctx.userData('get'), teams));
}
