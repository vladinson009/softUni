import { host, url, main } from './restLinks.js';
import { showHome } from './viewHome.js';

const addMovieView = document.getElementById('add-movie');
const form = addMovieView.querySelector('form');

form.addEventListener('submit', onSubmit);

addMovieView.remove();
form.reset();

export function onAddMovie(e) {
  e.preventDefault();
  main.replaceChildren(addMovieView);
}

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const imageUrl = formData.get('imageUrl').trim();

  if (!title || !description || !imageUrl) {
    alert('All fields are required!');
    return;
  }
  const { token, id } = JSON.parse(localStorage.getItem('userData'));

  if (token == null || id == null) {
    alert("Problem with user's authentication!");
    return;
  }
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
    body: JSON.stringify({ title, description, img: imageUrl, _ownerId: id }),
  };
  try {
    const response = await fetch(host + url.movies, options);
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }
    const data = await response.json();
    showHome();
    form.reset();
  } catch (error) {
    throw alert(error.message);
  }
}
