const fsp = require("fs/promises");
const path = require("path");

const { allBreedsTemplate } = require("../utils/template");
const getAllCats = require("../utils/getData");

async function get(req, res) {
  const filepath = path.normalize(
    path.join(__dirname, "../views/catShelter.html")
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

    let modifiedData = data
      .toString()
      .replace("{{id}}", cat.id)
      .replace("{{name}}", cat.name)
      .replace("{{description}}", cat.description)
      .replace("{{breed}}", cat.breed)
      .replace("{{image}}", `${path.join("/content/images/" + cat.image)}`)
      .replace("{{breeds}}", template);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.write(modifiedData);
    res.end();
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write(error.message);
    res.end();
  }
}

async function post(req, res) {
  try {
    const { cats, cat } = await getAllCats(req);

    const otherCats = cats.filter((x) => x.id != cat.id);
    const updatedList = JSON.stringify(otherCats, null, 2);

    await fsp.writeFile("./data/cats.json", updatedList, "utf-8");
    const filePath = path.normalize(
      path.join(__dirname, "../content/images/", cat.image)
    );

    await fsp.unlink(filePath);
    res.writeHead(301, {
      Location: "/",
    });
    res.end();
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write(error.message);
    res.end();
  }
}

const catShelterHandler = {
  get,
  post,
};

module.exports = catShelterHandler;
