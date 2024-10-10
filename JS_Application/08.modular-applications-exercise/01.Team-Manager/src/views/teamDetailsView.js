import { becomeMember, removeMember, approveMember } from '/api.js';
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
        ${access.isMember
          ? html`<a @click=${events.onLeave} href=${team._id} class="action invert"
              >Leave team</a
            >`
          : null}
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
const membershipRequestTemplate = (data, onApprove, onDecline) =>
  html`<li>
    ${data.user.username}<a @click=${onApprove} href="${data._id}" class="tm-control action"
      >Approve</a
    ><a @click=${onDecline} href="${data._id}" class="tm-control action">Decline</a>
  </li>`;
///////////////////////////////////////////////////////////////////////////
const membersTemplate = (member, isOwner, onRemove) =>
  html`<li>
    ${member.user.username}${isOwner
      ? html`<a @click=${onRemove} href=${member._id} class="tm-control action"
          >Remove from team</a
        >`
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
      return memberCards.push(membersTemplate(member, isOwner, onRemove));
    }
  });
  const requestCards = pendings.map((el) => membershipRequestTemplate(el, onApprove, onDecline));
  //////// FROM HERE

  const isPending = pendings.some((el) => el._ownerId === currentUserId);

  const allTeams = await getAllTeams();
  const allMembers = await getAllMembers();

  ctx.updateNavBar();
  const membersInput = { memberCards, countMember, requestCards };
  const access = { isSession, isOwner, isMember, isPending };
  const events = { onJoin, onCancel, onLeave };
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
    membersInput.requestCards = pendings.map((el) =>
      membershipRequestTemplate(el, onApprove, onDecline)
    );
    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
  async function onCancel(e) {
    e.preventDefault();
    const requestedId = people.find((el) => el._ownerId == currentUserId)._id;
    if (requestedId) {
      await removeMember(requestedId);
    }
    const ppl = await getMembersInTeam(teamId);
    const pendings = ppl.filter((el) => el.status == 'pending');
    access.isPending = false;

    membersInput.requestCards = pendings.map((el) =>
      membershipRequestTemplate(el, onApprove, onDecline)
    );

    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
  async function onLeave(e) {
    e.preventDefault();
    const requestedId = members.find((el) => el._ownerId == currentUserId)._id;
    if (requestedId) {
      await removeMember(requestedId);
    }
    const people = await getMembersInTeam(teamId);
    const updatedMembers = people.filter((el) => el.status == 'member');
    const memberCards = [];
    updatedMembers.map((member) => {
      if (member.user._id == currentUserId) {
        return memberCards.unshift(html`<li>${member.user.username}</li>`);
      } else {
        return memberCards.push(membersTemplate(member, isOwner, onRemove));
      }
    });
    membersInput.memberCards = memberCards;
    access.isMember = false;
    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
  async function onApprove(e) {
    e.preventDefault();
    const requestedId = e.target.getAttribute('href');
    if (requestedId) {
      await approveMember(requestedId);
    }
    const people = await getMembersInTeam(teamId);
    const pending = people.filter((el) => el.status == 'pending');
    const members = people.filter((el) => el.status == 'member');
    const memberCards = [];
    members.map((member) => {
      if (member.user._id == currentUserId) {
        return memberCards.unshift(html`<li>${member.user.username}</li>`);
      } else {
        return memberCards.push(membersTemplate(member, isOwner, onRemove));
      }
    });
    access.isPending = false;
    access.isMember = true;
    membersInput.requestCards = pending.map((el) =>
      membershipRequestTemplate(el, onApprove, onDecline)
    );
    membersInput.memberCards = memberCards;
    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
  async function onDecline(e) {
    e.preventDefault();
    const requestedId = e.target.getAttribute('href');
    if (requestedId) {
      await removeMember(requestedId);
    }
    const people = await getMembersInTeam(teamId);
    const pending = people.filter((el) => el.status == 'pending');
    const members = people.filter((el) => el.status == 'member');
    const memberCards = [];
    members.map((member) => {
      if (member.user._id == currentUserId) {
        return memberCards.unshift(html`<li>${member.user.username}</li>`);
      } else {
        return memberCards.push(membersTemplate(member, isOwner, onRemove));
      }
    });
    access.isPending = false;

    membersInput.requestCards = pending.map((el) =>
      membershipRequestTemplate(el, onApprove, onDecline)
    );
    membersInput.memberCards = memberCards;
    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
  async function onRemove(e) {
    e.preventDefault();
    //const requestedId = members.find((el) => el._ownerId == currentUserId)._id;
    console.log(e.target.getAttribute('href'));
    const requestedId = e.target.getAttribute('href');

    if (requestedId) {
      await removeMember(requestedId);
    }
    const people = await getMembersInTeam(teamId);
    const updatedMembers = people.filter((el) => el.status == 'member');
    const memberCards = [];
    updatedMembers.map((member) => {
      if (member.user._id == currentUserId) {
        return memberCards.unshift(html`<li>${member.user.username}</li>`);
      } else {
        return memberCards.push(membersTemplate(member, isOwner, onRemove));
      }
    });
    membersInput.memberCards = memberCards;
    access.isMember = false;
    ctx.render(teamDetailsTemplate(team, membersInput, access, events));
  }
}
