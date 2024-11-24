import Movie from '../models/Movie.js';
export function getAll() {
  return Movie.find();
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
