import { host, url, main } from './restLinks.js';
import { onAddMovie } from './viewAddMovie.js';

const homeSection = document.getElementById('home-page');
const h1 = document.getElementById('h1');
const addMovieBtn = document.getElementById('add-movie-button');
const movie = document.getElementById('movie');
export const movieContainer = document.querySelector(
  '.card-deck.d-flex.justify-content-center'
);

addMovieBtn.addEventListener('click', onAddMovie);

homeSection.remove();
h1.remove();
addMovieBtn.remove();
movie.remove();

export function showHome() {
  getAllMovies();
  const userData = localStorage.getItem('userData');

  if (userData != null) {
    main.replaceChildren(homeSection, h1, addMovieBtn, movie);
  } else {
    main.replaceChildren(homeSection, h1, movie);
  }
}

export async function getAllMovies() {
  try {
    movieContainer.replaceChildren('Loading...');
    const response = await fetch(host + url.movies);

    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const data = await response.json();
    movieContainer.replaceChildren();
    data.map(moviePreview);
  } catch (error) {
    throw alert(error.message);
  }
}

function moviePreview(movie) {
  const userData = localStorage.getItem('userData');

  const div = document.createElement('div');
  div.className = 'card mb-4';

  let str = `
  <img class="card-img-top"
    src="${movie.img}"
    alt="Card image cap"
    width="400"
  />
  <div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
  </div>`;

  if (userData != null) {
    str += `
    <div class="card-footer">
     <a href="#">
      <button data-id="${movie._id}" type="button" class="btn btn-info detailsBtn">
        Details
      </button>
     </a>
    </div>`;
  }
  div.innerHTML = str;
  movieContainer.appendChild(div);
}
