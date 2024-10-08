import { getTeamById, getMembersInTeam, getPartyMembers } from '/api.js';
import { html } from '/lib.js';

const teamDetailsTemplate = (
  data,
  members,
  requestCards,
  isRegistered,
  isOwner,
  isMember
) => html`<section id="team-home">
  <article class="layout">
    <img src="${data.logoUrl}" class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${data.name}</h2>
      <p>${data.description}</p>
      <span class="details">${members.length} Members</span>
      <div>
        ${isOwner
          ? html`<a href="#" class="action">Edit team</a>`
          : isMember
          ? html` <a href="#" class="action invert">Leave team</a> `
          : html` <a href="#" class="action">Join team</a> `}
        Membership pending. <a href="#">Cancel request</a>
      </div>
    </div>
    <div class="pad-large">
      <h3>Members</h3>
      <ul class="tm-members">
        <li>${isMember ? isRegistered.username : null}</li>
        ${members}
      </ul>
    </div>
    ${isOwner
      ? html`<div class="pad-large">
          <h3>Membership Requests</h3>
          <ul class="tm-members">
            ${requestCards}
          </ul>
        </div>`
      : null}
  </article>
</section>`;
const membershipRequestTemplate = (data) =>
  html`<li>
    ${data.user.username}<a href="#" class="tm-control action">Approve</a
    ><a href="#" class="tm-control action">Decline</a>
  </li>`;

const membersTemplate = (data, isOwner) =>
  html`<li>
    ${data.user.username}${isOwner
      ? html`<a href=${data._id} class="tm-control action">Remove from team</a>`
      : null}
  </li>`;

export async function showTeamDetail(ctx) {
  const teamId = ctx.params.id;
  const team = await getTeamById(teamId);
  const members = await getMembersInTeam(teamId);

  const isLogged = ctx.userData('get');

  const currentUserId = isLogged.id;
  const teamOwner = team._ownerId;

  const isOwner = currentUserId === teamOwner;
  const isMember = members.some(
    (m) => m.user._id === currentUserId || m._ownerId === currentUserId
  );
  //const members = [];
  console.log(isMember);
  //console.log(members);
  //console.log(members[1].user._id !== currentUserId);

  // for (let obj of people) {
  //   if (obj.status == 'member') {
  //     members.push(obj);
  //   }
  // }

  const memberCards = members.map((el) => {
    if (el.user._id == currentUserId) {
      return;
    }
    return membersTemplate(el, isOwner);
  });
  const requestCards = members.map(membershipRequestTemplate);
  ctx.updateNavBar();
  ctx.render(teamDetailsTemplate(team, memberCards, requestCards, isLogged, isOwner, isMember));
}
