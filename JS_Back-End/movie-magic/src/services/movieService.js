import Movie from '../models/Movie.js';
export function getAll(filter = {}) {
  return Movie.find(filter);
}
export function getById(movieId) {
  return Movie.findOne({ _id: movieId });
}
export function create(data) {
  return Movie.create(data);
}
export function attachCast(movieId, castId, nameInMovie) {
  return Movie.findByIdAndUpdate(movieId, {
    $push: {
      cast: {
        nameInMovie,
        cast: castId,
      },
    },
  });
}
