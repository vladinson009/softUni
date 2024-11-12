const { readFile } = require('../util/fileSystem');
function getContentType(url) {
  if (url.endsWith('css')) {
    return 'text/css';
  } else if (url.endsWith('ico')) {
    return 'image/svg+xml';
  } else if (url.endsWith('html')) {
    return 'text/html';
  } else if (url.endsWith('png')) {
    return 'image/png';
  } else if (url.endsWith('jpeg') || url.endsWith('jpg')) {
    return 'image/jpeg';
  }
}
async function serveStatic(req, res) {
  if (req.url.startsWith('/content') && req.method == 'GET') {
    try {
      const data = await readFile(req.url);
      const contentType = getContentType(req.url);

      res.writeHead(200, {
        'Content-Type': contentType,
      });
      res.write(data);
      res.end();
    } catch (err) {
      return console.log(err.message);
    }
  } else {
    return true;
  }
}

module.exports = { serveStatic };
