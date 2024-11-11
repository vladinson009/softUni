const fs = require('fs');
const path = require('path');

function readFile(pathFile) {
  const relative = path.join('./', pathFile);
  return fs.readFileSync(relative, 'utf-8');
}
function writeFile(pathFile, extname, data) {
  const relative = path.join('./', pathFile + '.' + extname);
  fs.writeFileSync(relative, data);
}
module.exports = { readFile, writeFile };
