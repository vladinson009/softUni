import fs from 'fs/promises';
const filePath = 'src/database.json';

export async function readFile() {
  return JSON.parse(await fs.readFile(filePath, { encoding: 'utf-8' }));
}
export async function writeFile(data) {
  const database = await readFile();
  database.movies.push(data);
  fs.writeFile(filePath, JSON.stringify(database, null, 2), { encoding: 'utf-8' });
}
