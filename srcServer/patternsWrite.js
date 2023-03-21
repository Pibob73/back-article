class WriteToFile {
  constructor(article) {
    this.format = `${article.title},${article.author},${article.text}`;
    return this.format;
  }
}

module.exports = { WriteToFile };
