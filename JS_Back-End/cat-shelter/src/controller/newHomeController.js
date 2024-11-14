const { readFile, writeFile } = require('../util/fileSystem');
const path = require('path');
const fs = require('fs').promises;
async function newHome(req, res) {
  const catId = req.url.split('/')[2];
  if (req.url.includes('/find-new-home') && req.method == 'GET') {
    let [cats, main, CatShelterView] = await Promise.all([
      readFile('/data/cats.json'),
      readFile('/views/home/index.html'),
      readFile('/views/catShelter.html'),
    ]);
    const cat = JSON.parse(cats).find((obj) => obj._id === catId); // {}
    if (!cat) {
      res.writeHead(302, {
        location: '/',
      });
      res.end();
      return;
    }
    let result = main;
    result = result.replace('%%form%%', '');
    result = result.replace('{{{body}}}', CatShelterView);
    Object.entries(cat).forEach(([k, v]) => {
      result = result.replaceAll(`%%${k}%%`, v);
    });
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  } else if (req.url.includes('/find-new-home') && req.method == 'POST') {
    const cats = JSON.parse(await readFile('/data/cats.json'));
    const index = cats.findIndex((el) => el._id === catId);
    if (index !== -1) {
      await fs.unlink(path.join(__dirname, '../../', cats[index].imageUrl));
      cats.splice(index, 1);
      await writeFile('/data/cats', 'json', JSON.stringify(cats));
      res.writeHead(302, {
        location: '/',
      });
      res.end();
    }
  } else {
    return true;
  }
}

module.exports = { newHome };
