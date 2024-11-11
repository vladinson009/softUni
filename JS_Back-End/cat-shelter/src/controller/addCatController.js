const { readFile } = require('../util/fileSystem');

async function addCatView(req, res) {
  if (req.url == '/cats/add-cat' && req.method == 'GET') {
    // const breeds = JSON.parse(await readFile('/data/breeds.json'));
    // const main = await readFile('/views/home/index.html');
    // const addCatView = await readFile('/views/addCat.html');
    // const addCatOptionTemplate = await readFile('/views/partials/addCatOption.html');
    let [breeds, main, addCatView, addCatOptionTemplate] = await Promise.all([
      readFile('/data/breeds.json'),
      readFile('/views/home/index.html'),
      readFile('/views/addCat.html'),
      readFile('/views/partials/addCatOption.html'),
    ]);
    breeds = JSON.parse(breeds);
    let options = breeds.map((br) => addCatOptionTemplate.replaceAll('%%body%%', br));
    let result = main.replace('{{{body}}}', addCatView);
    result = result.replace('%%body%%', options.join('\n'));
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  } else {
    return true;
  }
}

module.exports = { addCatView };
