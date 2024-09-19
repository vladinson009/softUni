import { host } from './restLinks.js';
import { getLikeFromUser, movieDetail } from './viewDetailsMovie.js';

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
    const response = await fetch(host + '/data/likes', options);
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
    const response = await fetch(host + '/data/likes/' + likeId, options);
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }
    movieDetail(movieId);
  } catch (error) {
    throw alert(error.message);
  }
}
export async function onEdit(userData, movieId) {}
export async function onDelete(userData, movieId) {}
