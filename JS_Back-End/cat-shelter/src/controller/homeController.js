const { readFile } = require('../util/fileSystem');

async function homeView(req, res) {
  if (req.url == '/' && req.method == 'GET') {
    let [readCats, catTemplate, search, index, homePage] = await Promise.all([
      readFile('/data/cats.json'),
      readFile('/views/partials/homepageCat.html'),
      readFile('/views/partials/homepageSearch.html'),
      readFile('/views/home/index.html'),
      readFile('/views/mainPage.html'),
    ]);
    readCats = JSON.parse(readCats);
    const cats = readCats.map((cat) => {
      let temp = catTemplate;
      Object.entries(cat).forEach(([k, v]) => {
        const regex = new RegExp('%%' + k + '%%', 'g');
        temp = temp.replaceAll(regex, v);
      });
      return temp;
    });
    let result = index.replace('{{{body}}}', homePage);
    result = result.replace('%%form%%', search);
    result = result.replace('{{{body}}}', cats.join('\n'));

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  } else {
    return true;
  }
}

module.exports = { homeView };
