const { readFile, writeFile } = require('../util/fileSystem');
const querystring = require('querystring');
async function addBreedView(req, res) {
  if (req.url == '/cats/add-breed' && req.method == 'GET') {
    const main = await readFile('/views/home/index.html');
    const addBreedView = await readFile('/views/addBreed.html');

    let result = main.replace('{{{body}}}', addBreedView);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  } else if (req.url == '/cats/add-breed' && req.method == 'POST') {
    const breeds = JSON.parse(await readFile('/data/breeds.json'));
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const formData = new URLSearchParams(body);
      const newBreed = formData.get('breed');

      breeds.push(newBreed);
      await writeFile('/data/breeds', 'json', JSON.stringify(breeds));

      res.writeHead(302, {
        location: '/',
      });
      res.end();
    });
  } else {
    return true;
  }
}

module.exports = { addBreedView };
