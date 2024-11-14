const { readFile, writeFile } = require('../util/fileSystem');
const fs = require('fs').promises;
const formidable = require('formidable');
const path = require('path');
const { addCatForm } = require('../util/catFormParser');
async function addCatView(req, res) {
  if (req.url == '/cats/add-cat' && req.method == 'GET') {
    let [breeds, main, addCatView, addCatOptionTemplate] = await Promise.all([
      readFile('/data/breeds.json'),
      readFile('/views/home/index.html'),
      readFile('/views/addCat.html'),
      readFile('/views/partials/addCatOption.html'),
    ]);
    breeds = JSON.parse(breeds);
    let options = breeds.map((br) => addCatOptionTemplate.replaceAll('%%body%%', br));
    let result = main.replace('{{{body}}}', addCatView);
    result = result.replace('%%form%%', '');
    result = result.replace('%%body%%', options.join('\n'));
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  } else if (req.url == '/cats/add-cat' && req.method == 'POST') {
    addCatForm(req, res);
  } else {
    return true;
  }
}

module.exports = { addCatView };
