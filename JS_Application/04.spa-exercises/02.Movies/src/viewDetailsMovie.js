import { host, url } from './restLinks.js';

export const movieExample = document.getElementById('movie-example');

//movieDetail.remove();

export async function movieDetail(id) {
  const userId = JSON.parse(localStorage.getItem('userData')).id;
  const main = document.getElementById('main');
  main.replaceChildren();

  const [getNumOfLikes, getById] = await Promise.all([
    getNumberOfLikes(id),
    getMovieById(id),
  ]);
  renderMovieDetail(getById, getNumOfLikes);

  console.log(id + '<MOVIE ID\n', userId + '< USERID');
  console.log('\n\n');
  console.log(getNumOfLikes, 'get NUM OF LIKES');
}

async function getMovieById(movieId) {
  try {
    const response = await fetch(host + url.movies + '/' + movieId);
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }
    return response.json();
  } catch (error) {
    alert(error.message);
    return;
  }
}
async function getNumberOfLikes(movieId) {
  try {
    const response = await fetch(
      host +
        `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`
    );
    if (response.ok != true) {
      const err = response.json();
      throw new Error(err.message);
    }
    return response.json();
  } catch (error) {
    throw alert(error.message);
  }
}
export async function getLikeFromUser(movieId, userId) {
  try {
    const response = await fetch(
      host +
        `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
    );
    if (response.ok != true) {
      const err = response.json();
      throw new Error(err.message);
    }
    return response.json();
  } catch (error) {
    throw alert(error.message);
  }
}

async function renderMovieDetail(movie, likedCount) {
  let likeBtn = 'Like';

  const userData = JSON.parse(localStorage.getItem('userData'));
  const liked = await getLikeFromUser(movie._id, userData.id);
  if (liked.length > 0) {
    likeBtn = 'Unlike';
  }

  let isOwner = '';
  if (userData != null) {
    isOwner = `<a class="btn btn-danger" href="#">Delete</a>
               <a class="btn btn-warning" href="#">Edit</a>`;
    if (userData.id != movie._ownerId) {
      isOwner = `<a class="btn btn-primary" href="#">${likeBtn}</a>`;
    }
  }
  const div = document.createElement('div');
  div.className = 'container';
  let str = `<div class="row bg-light text-dark">
              <h1>Movie title: ${movie.title}</h1>

              <div class="col-md-8">
                <img
                  class="img-thumbnail"
                  src="${movie.img}"
                  alt="Movie"
                />
              </div>
              <div class="col-md-4 text-center" data-id="${movie._id}">
                <h3 class="my-3">Movie Description</h3>
                <p>
                 ${movie.description}
                </p>
                ${isOwner}
                <span class="enrolled-span">Liked ${likedCount}</span>
              </div>
            </div>`;
  div.innerHTML = str;
  movieExample.replaceChildren(div);
  document.querySelector('main').replaceChildren(movieExample);
}
