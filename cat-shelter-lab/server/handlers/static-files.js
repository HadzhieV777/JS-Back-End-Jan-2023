const url = require("url");
const fs = require("fs");
const path = require("path");

function getContentType(pn) {
  if (pn.endsWith("css")) {
    return "text/css";
  }
  if (pn.endsWith("ico")) {
    return "image/svg+xml";
  }
  if (pn.endsWith("jpeg") || pn.endsWith("jpg")) {
    return "image/jpeg";
  }
  if (pn.endsWith("png")) {
    return "image/png";
  }
}

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (pathname.startsWith("/content") && req.method === "GET") {
    fs.readFile(`./${pathname}`, "utf-8", (error, data) => {
      if (error) {
        res.writeHead(404);
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.write("Whoops! File not found!");
      }

      res.writeHead(200, {
        "Content-Type": getContentType(pathname),
      });

      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
};
