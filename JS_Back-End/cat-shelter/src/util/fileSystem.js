const fs = require('fs').promises;
const path = require('path');

async function readFile(pathFile) {
  const relative = path.join('./', pathFile);
  return await fs.readFile(relative, 'utf-8');
}
async function writeFile(pathFile, extname, data) {
  const relative = path.join('./', pathFile + '.' + extname);
  return await fs.writeFile(relative, data);
}
module.exports = { readFile, writeFile };
