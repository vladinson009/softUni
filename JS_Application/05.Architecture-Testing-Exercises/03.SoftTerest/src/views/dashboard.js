import { del, get } from '../api.js';
import { userData } from '../userData.js';

const section = document.getElementById('dashboard-holder');
section.addEventListener('click', onDetails);
section.remove();

export async function showDashboard(main) {
  main.replaceChildren(section);
  const data = await get(
    '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc'
  );
  if (data.length == 0) {
    const h1 = document.createElement('h1');
    h1.textContent = 'No ideas yet! Be the first one :)';
    section.replaceChildren(h1);
  } else {
    const ideas = data.map(createIdeasCard);
    section.replaceChildren(...ideas);
  }
}

async function onDetails(e) {
  e.preventDefault();
  const target = e.target;
  if (target.tagName == 'A' && target.className.includes('detailsBtn')) {
    const ideaId = target.dataset.id;
    const idea = await get('/data/ideas/' + ideaId);
    section.replaceWith(createDetailsCard(idea));
  }
}

function createDetailsCard(idea) {
  const div = document.createElement('div');
  const currentUserId = userData().id;
  let innerHtml = `<img class="det-img" src="${idea.img}" />
        <div class="desc">
          <h2 class="display-5">${idea.title}</h2>
          <p class="infoType">Description:</p>
          <p class="idea-description">${idea.description}</p>
        </div>
        `;
  if (currentUserId == idea._ownerId) {
    innerHtml += `<div class="text-center">
          <a class="btn detb" href="">Delete</a>
        </div>`;

    div.addEventListener('click', async (e) => {
      e.preventDefault();
      const t = e.target;
      if (t.tagName == 'A' && t.className == 'btn detb') {
        await del('/data/ideas/' + idea._id);
        showDashboard(document.getElementById('main'));
      }
    });
  }

  div.className = 'container home some';
  div.innerHTML = innerHtml;
  return div;
}

function createIdeasCard(data) {
  const div = document.createElement('div');
  div.className = 'card overflow-hidden current-card details';
  div.style = 'width: 20rem; height: 18rem';

  div.innerHTML = `
<div class="card-body">
            <p class="card-text">${data.title}</p>
          </div>
          <img
            class="card-image"
            src="${data.img}"
            alt="Card image cap"
          />
          <a data-id="${data._id}" class="btn detailsBtn" href="">Details</a>
`;
  return div;
}
