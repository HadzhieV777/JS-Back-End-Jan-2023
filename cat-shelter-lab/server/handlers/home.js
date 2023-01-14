const fsp = require("fs/promises");
const path = require("path");

async function get(req, res) {
  const filePath = path.normalize(path.join(__dirname, "../views/index.html"));

  try {
    let data = await fsp.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(data);
    res.end();
  } catch {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.write("404 Not Found");
    res.end();
  }
}

const homeHandler = {
  get,
};

module.exports = homeHandler;
