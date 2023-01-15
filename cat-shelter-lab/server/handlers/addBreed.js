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

function post(req, res) {
  // Parse the incoming data from the form
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, field) => {
    try {
      if (err) {
        throw err;
      }

      // Read the breeds.json file
      const data = await fsp.readFile("./data/breeds.json");
      let existing = JSON.parse(data);

      // Modify the breeds.json file
      if (!existing.includes(field.breed)) {
        existing.push(field.breed);
        let updated = JSON.stringify(existing);

        // Update the breeds.json file
        await fsp.writeFile("./data/breeds.json", updated, "utf-8");

        // Redirect to the home page ('/') and end the response
        res.writeHead(301, {
          Location: "/",
        });
        res.end();
      }
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write(error.message);
      res.end();
    }
  });
}

const addBreedHandler = {
  get,
  post,
};

module.exports = addBreedHandler;
