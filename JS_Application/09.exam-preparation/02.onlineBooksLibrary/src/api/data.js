import { get, post, put, del } from './api.js';

export async function getAllBooks() {
  return get('/data/books?sortBy=_createdOn%20desc');
}
export async function getBookById(bookId) {
  return get('/data/books/' + bookId);
}
export async function getMyBooks(userId) {
  return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function createBook(title, description, imageUrl, type) {
  return post('/data/books', { title, description, imageUrl, type });
}
export async function editBook(bookId, title, description, imageUrl, type) {
  return put('/data/books/' + bookId, { title, description, imageUrl, type });
}
export async function deleteBook(bookId) {
  return del('/data/books/' + bookId);
}
export async function addLike(bookId) {
  return post('/data/likes', { bookId });
}
export async function getLikes(bookId) {
  return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}
export async function getLikeFromUser(bookId, userId) {
  return get(
    `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
