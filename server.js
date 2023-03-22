'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { createArticle } = require('./createArticle.js');
const { getArticle } = require('./getArticle.js');

const FrontPath = path.join(process.cwd(), '/dist/index.html');
const hostName = '127.0.0.1';
const port = 3000;
const defaultSetEncoding = 'utf-8';

const requestListener = function (req, res) {
  req.setEncoding(defaultSetEncoding);
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/') {
    let data = [];

    req.on('data', (chunk) => {
      data.push(chunk);
    });

    req
      .on('end', () => {
        createArticle(data.join(''));
      })
      .on('error', (err) => {
        console.error(`Got error: ${err.message}`);
      });

    res.writeHead(200);

    fs.readFile(FrontPath, (err, data) => res.end(data));
    return;
  }
  if (req.url.match('/article/(/d+|w+|-+)$')[0] !== '') {
    const data = getArticle(req.url);
    res.setHeader(200);
    res.end(data);
    return;
  }
  res.setHeader(404);
};
const server = http.createServer(requestListener);
server.listen(port, hostName, () => {
  console.log(`server work at http://${hostName}: ${port}`);
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
