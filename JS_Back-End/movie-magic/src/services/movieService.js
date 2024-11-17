import { readFile, writeFile } from './fileSystem.js';

export async function getAll() {
  const data = await readFile();
  return data.movies;
}
export async function getById(movieId) {
  const data = await readFile();
  const movies = data.movies;

  return movies.find((movie) => movie.id == movieId);
}
export async function create(movie) {
  await writeFile(movie);
}
