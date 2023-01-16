const fsp = require("fs/promises");
const path = require("path");

const getAllCats = require("../utils/getData");
const {allBreedsTemplate} = require('../utils/template')

async function get(req, res) {
  const filepath = path.normalize(
    path.join(__dirname, "../views/editCat.html")
  );

  try {
    const data = await fsp.readFile(filepath);
    const { cats, cat } = await getAllCats(req);

    const template = allBreedsTemplate
      .map((x) => {
        if (x.includes(cat.breed)) {
          return `<option value="${cat.breed}" selected>${cat.breed}</option>`;
        }
        return x;
      })
      .join("");

    const modifiedData = data
      .toString()
      .replace("{{id}}", cat.id)
      .replace("{{id}}", cat.id)
      .replace("{{name}}", cat.name)
      .replace("{{description}}", cat.description)
      .replace("{{breed}}", cat.breed)
      .replace("{{image}}", `${path.join("/content/images/" + cat.image)}`)
      .replace("{{breeds}}", template);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(modifiedData);
    res.end();
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write(error.message);
    res.end();
  }
}


const editCatHandler = {
    get
}

module.exports = editCatHandler