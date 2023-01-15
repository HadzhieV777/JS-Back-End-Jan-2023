const fsp = require("fs/promises");
const path = require("path");

const { allBreedsTemplate } = require("../utils/template");

async function get(req, res) {
  const filePath = path.normalize(path.join(__dirname, "../views/addCat.html"));

  try {
    const data = await fsp.readFile(filePath);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const modifiedData = data
      .toString()
      .replace("{{catBreeds}}", allBreedsTemplate.join(""));
    
    res.write(modifiedData);
    res.end();
  } catch (error) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.write("404 File Not Found!");
    res.end();
  }
}

const addCatHandler = {
  get,
};

module.exports = addCatHandler;
