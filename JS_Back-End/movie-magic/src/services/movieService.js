import fs from 'fs/promises';

export async function getAll() {
  const data = await readFile();
  return data.movies;
}
export async function getById(movieId) {
  const movies = readFile();
  return movies.find((movie) => movie.id == movieId);
}
export async function create(movie) {
  await writeFile(movie);
}

const filePath = 'src/database.json';
async function readFile() {
  return JSON.parse(await fs.readFile(filePath, { encoding: 'utf-8' }));
}
async function writeFile(data) {
  const database = await readFile();
  database.movies.push(data);
  fs.writeFile(filePath, JSON.stringify(database, null, 2), { encoding: 'utf-8' });
}
