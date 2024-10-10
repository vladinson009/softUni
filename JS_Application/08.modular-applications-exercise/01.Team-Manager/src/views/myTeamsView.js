import { getMembersInTeam, getAllMembers, getAllTeams } from '/api.js';
import { html } from '/lib.js';

const myTeamTemplate = (teams, access) => html`<section id="my-teams">
  <article class="pad-med">
    <h1>My Teams</h1>
  </article>
  <article class="layout narrow">
    ${!access.isMember
      ? html`<div class="pad-med">
          <p>You are not a member of any team yet.</p>
          <p>
            <a href="/browse-teams">Browse all teams</a> to join one, or use the button bellow to
            cerate your own team.
          </p>
        </div>`
      : html`<br />`}
    <div class=""><a href="/create-team" class="action cta">Create Team</a></div>
  </article>
  ${access.isMember ? html`${teams}` : null}
</section>`;

const teamTemplate = (team, members) => html`<article class="layout">
  <img src=${team.logoUrl} class="team-logo left-col" />
  <div class="tm-preview">
    <h2>${team.name}</h2>
    <p>${team.description}</p>
    <span class="details">${members} Members</span>
    <div><a href=${`/my-teams/details/` + team._id} class="action">See details</a></div>
  </div>
</article>`;
export async function showMyTeam(ctx) {
  ctx.updateNavBar();
  const currentId = ctx.userData('get').id;
  const allTeams = await getAllTeams();
  const allMembers = await getAllMembers();
  const meAsMember = allMembers.filter((e) => e._ownerId == currentId);
  const myTeams = meAsMember.reduce((a, el) => {
    const result = {};
    allTeams.forEach((team) => {
      if (team._id == el.teamId) {
        result[team._id] = team;
      }
    });
    return Object.assign(a, result);
  }, {});
  const myTeamCards = [];
  for (let team in myTeams) {
    const current = myTeams[team];
    const membersInTeam = await getMembersInTeam(current._id);

    myTeamCards.push(teamTemplate(current, membersInTeam.length));
  }
  const isMember = myTeamCards.length > 0;

  const members = allMembers.filter((el) => el.status == 'member');
  //const isMember = members.some((m) => m._id === currentUserId || m._ownerId === currentUserId);
  const access = { isMember };
  ctx.render(myTeamTemplate(myTeamCards, access));
}
