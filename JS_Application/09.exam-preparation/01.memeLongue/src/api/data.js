import { post, get, del, put } from './api.js';

export async function createMeme(title, description, imageUrl) {
  return post('/data/memes', { title, description, imageUrl });
}
export async function getAllMemes() {
  return get('/data/memes?sortBy=_createdOn%20desc');

  ///data/memes?sortBy=_createdOn%20desc
}
export async function getMemeById(memeId) {
  return get('/data/memes/' + memeId);
}
export async function deleteMemeById(memeId) {
  return del('/data/memes/' + memeId);
}
export async function editMemeById(memeId, data) {
  return put('/data/memes/' + memeId, data);
}
export async function getUserMemes(userId) {
  return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
