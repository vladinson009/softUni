import Movie from '../Models/Movie.js';
export function getAll() {
  return Movie.find();
}
export function getById(movieId) {
  return Movie.findOne({ _id: movieId });
}
export function create(data) {
  return Movie.create(data);
}
