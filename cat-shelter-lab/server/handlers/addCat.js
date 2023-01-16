const formidable = require("formidable");
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

function post(req, res) {
  // Parse the incoming data from the form
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, file) => {
    try {
      if (err) {
        throw err;
      }

      // store the path of the uploaded file on the server's file system when the form is initially parsed
      // This path is typically a temporary location where the file is stored after upload and before it is processed
      const oldPath = file.upload.filepath;

      // store the desired final location of the file on the server's file system after it has been processed
      const newPath = path.normalize(
        path.join(__dirname, "../content/images", file.upload.originalFilename)
      );

      // Copy the uploaded file from its temporary location to a new location
      await fsp.copyFile(oldPath, newPath);
      // Delete the original uploaded file from its temporary location
      await fsp.unlink(oldPath);

      //  Read the contents of a JSON file
      const data = await fsp.readFile("./data/cats.json");

      // Parse the JSON data and push a new object containing the form fields and the uploaded file name
      let existing = JSON.parse(data);
      const body = Object.assign({}, fields, { image: file.upload.originalFilename });
      body.id = setId(existing.length);
      existing.push(body);

      let updated = JSON.stringify(existing, null, 2);

      // Stringify the updated data and write it back to the JSON file
      await fsp.writeFile("./data/cats.json", updated, "utf-8");

      res.writeHead(301, { Location: "/" });
      res.end();
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write(error.message);
      res.end();
    }
  });
}

const addCatHandler = {
  get,
  post,
};

function setId(num) {
  let id = (
    "00000000" + ((Math.random() * 99999999 * num) | 0).toString(16)
  ).slice(-8);
  return id;
}

module.exports = addCatHandler;
