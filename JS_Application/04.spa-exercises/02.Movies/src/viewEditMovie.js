import { updateNav } from './navBar.js';
import { host, main, url } from './restLinks.js';
import { getMovieById, movieDetail } from './viewDetailsMovie.js';
import { showLogin } from './viewLogin.js';

const editMovieSection = document.getElementById('edit-movie');
const form = editMovieSection.querySelector('form');
const title = form.querySelector('input[name="title"]');
const description = form.querySelector('textarea[name="description"]');
const img = form.querySelector('input[name="imageUrl"]');

form.addEventListener('submit', onSubmitEdit);
editMovieSection.remove();
let currentId = null;

export async function showEditMovie(userData, movieId) {
  if (userData == null) {
    showLogin();
    updateNav();
    return;
  }
  const movie = await getMovieById(movieId);
  main.replaceChildren(editMovieSection);

  title.value = movie.title;
  description.value = movie.description;
  img.value = movie.img;
  currentId = movieId;
}

async function onSubmitEdit(e) {
  e.preventDefault();
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData == null) {
    showLogin();
    updateNav();
    return;
  }
  await Promise.all([
    updateMovieById(userData, currentId),
    movieDetail(currentId),
  ]);
}

async function updateMovieById(userData, movieId) {
  try {
    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.token,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        img: img.value,
      }),
    };
    const response = await fetch(host + url.movies + '/' + movieId, options);
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }
    const data = await response.json();
  } catch (error) {
    throw alert(error.message);
  }
}
