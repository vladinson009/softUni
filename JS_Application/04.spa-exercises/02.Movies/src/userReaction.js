import { host, url } from './restLinks.js';
import { getLikeFromUser, movieDetail } from './viewDetailsMovie.js';
import { showEditMovie } from './viewEditMovie.js';
import { showHome } from './viewHome.js';

export async function onLike(userData, movieId) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.token,
    },
    body: JSON.stringify({ movieId }),
  };
  try {
    const response = await fetch(host + url.likes, options);
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }
    movieDetail(movieId);
  } catch (error) {
    throw alert(error.message);
  }
}
export async function onUnlike(userData, movieId) {
  const getLike = await getLikeFromUser(movieId, userData.id);
  const likeId = getLike[0]._id;

  const options = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.token,
    },
  };
  try {
    const response = await fetch(host + url.likes + '/' + likeId, options);
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }
    movieDetail(movieId);
  } catch (error) {
    throw alert(error.message);
  }
}
export function onEdit(userData, movieId) {
  showEditMovie(userData, movieId);

  //
}
export async function onDelete(userData, movieId) {
  const options = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.token,
    },
  };
  fetch(host + url.movies + '/' + movieId, options);
  showHome();
}
