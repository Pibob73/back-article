const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const articleFormat = 'article';
const pathToArticle = path.join(process.cwd(), '/articles');

const createArticle = function (data) {
  if (!data) return;
  const article = JSON.parse(data);

  const uuid = () => crypto.randomUUID();

  const formatWrite = `${article.title},${article.author},${article.text}`;

  fs.writeFile(`./articles/${uuid}.article`, formatWrite, (err) => {
    if (err) console.err(err);
  });
};

module.exports = { createArticle };
