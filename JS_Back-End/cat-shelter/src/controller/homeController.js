const { readFile } = require('../util/fileSystem');

function homeView(req, res) {
  if (req.url == '/' && req.method == 'GET') {
    const readCats = JSON.parse(readFile('/data/cats.json'));
    const catTemplate = readFile('/views/partials/homepageCat.html');
    let index = readFile('/views/home/index.html');
    let homePage = readFile('/views/mainPage.html');
    const cats = readCats.map((cat) => {
      let temp = catTemplate;
      Object.entries(cat).forEach(([k, v]) => {
        const regex = new RegExp('%%' + k + '%%', 'g');
        temp = temp.replaceAll(regex, v);
      });
      return temp;
    });
    let result = index.replace('{{{body}}}', homePage);
    result = result.replace('{{{body}}}', cats);

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
