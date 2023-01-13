const url = require("url");
const fs = require("fs");
const path = require("path");

// Objects
const cats = require("../data/cats");
const breeds = require("../data/breeds");

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (pathname === "/" && req.method === "GET") {
    let filePath = path.normalize(path.join(__dirname, "../views/index.html"));

    res.writeHead(200, { "Content-Type": "text/html" });

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write("Whoops! File not found!");
      } else {
        res.write(data);
      }
      res.end();
    });
  } else {
    return true;
  }
};
