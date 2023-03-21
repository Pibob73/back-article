"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const { createArticle } = require("./createArticle.js");
const FrontPath = path.join(process.cwd(), "/dist/index.html");
const hostName = "127.0.0.1";
const port = 3000;
const DEFAULT_SET_ENCODING = "utf-8";

const requestListener = function (req, res) {
  req.setEncoding(DEFAULT_SET_ENCODING);
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req
      .on("end", () => {
        createArticle(data.join(""));
      })
      .on("error", (err) => {
        console.error(`Got error: ${err.message}`);
      });
    res.writeHead(200);
    fs.readFile("../dist/index.html", (err, data) => res.end(data));
  }

  // if (req.url.indexOf("/author/") > -1) {
  //   const idFile = req.url.slice(8);
  //   const infArticle = fs.readFileSync(`${idFile}.article`);
  //   const buffArticle = String(infArticle).split(",");
  //   buffArticle.forEach(function (el, index) {
  //     buffArticle[index] = el.slice(12);
  //   });
  //   res.writeHead(200);
  //   fs.readFile("./dist/getArticle.html", (err, data) => {
  //     data = data.toString();
  //     data = data.replace("$title", `"${buffArticle[0]}"`);
  //     data = data.replace("$author", `"${buffArticle[1]}"`);
  //     data = data.replace("$text", `"${buffArticle[2]}"`);
  //     res.end(data);
  //   });
  // }
};
const server = http.createServer(requestListener);
server.listen(port, hostName, () => {
  console.log(`server work at http://${hostName}: ${port}`);
});
