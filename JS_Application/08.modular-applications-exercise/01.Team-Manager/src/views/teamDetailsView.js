import { becomeMember, removeMember } from '/api.js';
import {
  getTeamById,
  getMembersInTeam,
  getPartyMembers,
  getAllMembers,
  getAllTeams,
} from '/api.js';
import { html } from '/lib.js';

const teamDetailsTemplate = (team, members, access, events) => html`<section id="team-home">
  <article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${team.name}</h2>
      <p>${team.description}</p>
      <span class="details">${members.countMember} Members</span>
      <div>
        ${access.isOwner
          ? html`<a href="/browse-teams/edit/${team._id}" class="action">Edit team</a>`
          : null}
        ${access.isMember ? html`<a href="#" class="action invert">Leave team</a>` : null}
        ${!access.isMember && access.isSession && !access.isPending
          ? html`<a @click=${events.onJoin} href=${team._id} class="action">Join team</a>`
          : !access.isMember && access.isSession && access.isPending
          ? html`Membership pending.
              <a @click=${events.onCancel} href=${team._id}>Cancel request</a>`
          : null}
      </div>
    </div>
    <div class="pad-large">
      <h3>Members</h3>
      <ul class="tm-members">
        ${members.memberCards}
      </ul>
    </div>
    ${access.isOwner
      ? html`<div class="pad-large">
          <h3>Membership Requests</h3>
          <ul class="tm-members">
            ${members.requestCards}
          </ul>
        </div>`
      : null}
  </article>
</section> `;
/////////////////////////////////////////////////////////////////////////////
const membershipRequestTemplate = (data) =>
  html`<li>
    ${data.user.username}<a href="${data._id}" class="tm-control action">Approve</a
    ><a href="${data._id}" class="tm-control action">Decline</a>
  </li>`;
///////////////////////////////////////////////////////////////////////////
const membersTemplate = (member, isOwner) =>
  html`<li>
    ${member.user.username}${isOwner
      ? html`<a href=${member._id} class="tm-control action">Remove from team</a>`
      : null}
  </li>`;

export async function showTeamDetail(ctx) {
  const teamId = ctx.params.id;
  const team = await getTeamById(teamId);
  const teamOwner = team._ownerId;

  const people = await getMembersInTeam(teamId);
  const members = people.filter((el) => el.status == 'member');
  const countMember = members.length;
  const pendings = people.filter((el) => el.status == 'pending');

  const isSession = ctx.userData('get');
  const currentUserId = isSession?.id;

  const isOwner = currentUserId === teamOwner;
  const isMember = members.some(
    (m) => m.user._id === currentUserId || m._ownerId === currentUserId
  );
  const memberCards = [];
  members.map((member) => {
    if (member.user._id == currentUserId) {
      return memberCards.unshift(html`<li>${member.user.username}</li>`);
    } else {
      return memberCards.push(membersTemplate(member, isOwner));
    }
  });
  const requestCards = pendings.map(membershipRequestTemplate);
  //////// FROM HERE

  const isPending = pendings.some((el) => el._ownerId === currentUserId);

  const allTeams = await getAllTeams();
  const allMembers = await getAllMembers();

  ctx.updateNavBar();
  const membersInput = { memberCards, countMember, requestCards };
  const access = { isSession, isOwner, isMember, isPending };
  const events = { onJoin, onCancel };
  ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  async function onJoin(e) {
    e.preventDefault();
    e.target = html``;
  }
  async function onJoin(e) {
    e.preventDefault();
    await becomeMember(e.target.getAttribute('href'));
    const people = await getMembersInTeam(teamId);

    const pendings = people.filter((el) => el.status == 'pending');
    access.isPending = true;
    membersInput.requestCards = pendings.map(membershipRequestTemplate);
    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
  async function onCancel(e) {
    e.preventDefault();
    const people = await getMembersInTeam(teamId);
    const pendings = people.filter((el) => el.status == 'pending');
    const requestedId = people.find((el) => el._ownerId == currentUserId)._id;
    if (requestedId) {
      await removeMember(requestedId);
    }
    access.isPending = false;
    membersInput.requestCards = pendings.map(membershipRequestTemplate);

    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
}
