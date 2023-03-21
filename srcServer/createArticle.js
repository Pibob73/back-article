const http = require("http");
const fs = require("fs");
const path = require("path");
const articleFormat = "article";
const { writeToFile } = require("./patternsWrite.js");
const createArticle = function (data) {
  if (data) {
    const article = JSON.parse(data);
    let enumerateFile;
    (async () => {
      await fs.readdir(process.cwd(), (err, files) => {
        enumerateFile =
          files.filter((el) => {
            return el.split(".") === articleFormat;
          }).length + 1;
      });
    })();
    fs.writeFile(`${enumerateFile}.article`, writeToFile(article), (err) => {
      if (err) {
        console.err(err);
        return;
      }
    });
  }
};

module.exports = { createArticle };
