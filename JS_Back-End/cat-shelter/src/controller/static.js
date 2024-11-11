const { readFile } = require('../util/fileSystem');
const path = require('path');
function getContentType(url) {
  if (url.endsWith('css')) {
    return 'text/css';
  } else if (url.endsWith('ico')) {
    return 'image/svg+xml';
  } else if (url.endsWith('html')) {
    return 'text/html';
  }
}

async function serveStatic(req, res) {
  if (req.url.startsWith('/content') && req.method == 'GET') {
    const data = await readFile(req.url);
    const contentType = getContentType(req.url);

    res.writeHead(200, {
      'Content-Type': contentType,
    });
    res.write(data);
    res.end();
  } else {
    return true;
  }
}

module.exports = { serveStatic };
