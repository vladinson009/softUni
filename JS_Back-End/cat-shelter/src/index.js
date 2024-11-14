const http = require('http');
const port = 3000;

const router = require('./router');
http
  .createServer((req, res) => {
    for (let route of router) {
      if (!route(req, res)) {
        break;
      }
    }
  })
  .listen(port);
