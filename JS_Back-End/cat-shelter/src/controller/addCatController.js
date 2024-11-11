const { readFile } = require('../util/fileSystem');

function addCatView(req, res) {
  if (req.url == '/cats/add-cat' && req.method == 'GET') {
    const breeds = JSON.parse(readFile('/data/breeds.json'));
    const main = readFile('/views/home/index.html');
    const addCatView = readFile('/views/addCat.html');
    const addCatOptionTemplate = readFile('/views/partials/addCatOption.html');
    let options = breeds.map((br) => addCatOptionTemplate.replaceAll('%%body%%', br));

    let result = main.replace('{{{body}}}', addCatView);
    result = result.replace('%%body%%', options.join('\n'));
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  }
}

module.exports = { addCatView };
