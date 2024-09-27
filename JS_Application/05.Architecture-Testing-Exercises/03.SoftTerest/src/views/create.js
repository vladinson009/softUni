import { post } from '../api.js';
import { userData } from '../userData.js';
import { showDashboard } from './dashboard.js';

const section = document.getElementById('createLink');
section.remove();

const form = section.querySelector('#createForm');
form.addEventListener('submit', onCreate);

export function showCreate(main) {
  main.replaceChildren(section);
}

async function onCreate(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const img = formData.get('imageURL').trim();

  const invalidTitle = title.length < 6;
  const invalidDescription = description.length < 10;
  const invalidImg = img.length < 5;

  if (invalidTitle) {
    return alert('The title should be at least 6 characters long.');
  } else if (invalidDescription) {
    return alert('The description should be at least 10 characters long.');
  } else if (invalidImg) {
    return alert('The image should be at least 5 characters long.');
  } else {
    const data = {
      title,
      description,
      img,
      _ownerId: userData().id,
    };
    form.reset();
    await post('/data/ideas', data);
    showDashboard(document.getElementById('main'));
  }
}
