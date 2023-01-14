const fsp = require("fs/promises");
const path = require("path");
const formidable = require("formidable");

async function get(req, res) {
  const filePath = path.normalize(
    path.join(__dirname, "../views/addBreed.html")
  );

  try {
    const data = await fsp.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(data);
    res.end();
  } catch (error) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.write("404 File Not Found");
    res.end();
  }
}

const addBreedHandler = {
  get,
};

module.exports = addBreedHandler