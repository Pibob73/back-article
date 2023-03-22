const fs = require('fs');
const path = require('path');

function getArticle(url) {
  const idFile = url.match('(/d+|w+|-+)$');

  fs.readFile(`${idFile}.article`, 'utf-8', (err, data) => {
    if (err) {
      console.err(err);
      return;
    }
    const buffArticle = data.split(',');

    buffArticle.forEach(function (el, index) {
      buffArticle[index] = el.slice(12);
    });
    fs.readFile('getArticle.html', (err, data) => {
      if (err) {
        console.err(err);
        return;
      }
      data = data.replace('$title', `"${buffArticle[0]}"`);
      data = data.replace('$author', `"${buffArticle[1]}"`);
      data = data.replace('$text', `"${buffArticle[2]}"`);
    });
  });
  return data;
}

module.exports = { getArticle };
