const fs = require("fs");
const url = require("url");
const path = require("path");

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (req.method === "GET") {
    if (pathname === "/cats/add-cat") {
      fileReader("../views/addCat.html", res);
    } else if (pathname === "/cats/add-breed") {
      fileReader("../views/addBreed.html", res);
    } else {
      return true;
    }
  } else if (req.method === "POST") {
  } else {
    return true;
  }
};

function fileReader(currentFilePath, response) {
  let filePath = path.normalize(path.join(__dirname, currentFilePath));
  response.writeHead(200, { "Content-Type": "text/html" });

  const file = fs.createReadStream(filePath);

  file.on("data", (data) => {
    response.write(data);
  });

  file.on("end", () => {
    response.end();
  });

  file.on("error", (err) => {
    console.log(err);
  });

  //   fs.readFile(filePath, (error, data) => {
  //     if (error) {
  //       response.writeHead(404);
  //       response.write("Whoops! File not found!");
  //     } else {
  //       response.write(data);
  //     }
  //     response.end();
  //   });
}
