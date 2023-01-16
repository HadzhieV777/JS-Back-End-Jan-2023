const fsp = require("fs/promises");
const path = require("path");

const { allCatsTemplate } = require("../utils/template");

async function get(req, res) {
  const filePath = path.normalize(path.join(__dirname, "../views/index.html"));

  try {
    let data = await fsp.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const modifiedData = data
      .toString()
      .replace("{{allCats}}", allCatsTemplate);
    res.write(modifiedData);
    res.end();
  } catch (error) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.write(error.message);
    res.end();
  }
}

const homeHandler = {
  get,
};

module.exports = homeHandler;
