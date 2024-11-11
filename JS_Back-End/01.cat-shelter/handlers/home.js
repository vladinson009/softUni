const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const data = fs.readFileSync(path.join('./', '/views/home/index.html'));
  if ((pathname === '/') & (req.method === 'GET')) {
    if (!data) {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('404 Not Found!');
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.write(data);
    }
    res.end();
  } else {
    return true;
  }
};
