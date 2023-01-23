const Cube = require("../models/Cube");
const db = require("../config/database.json");

exports.getCreateCube = (req, res) => {
  res.render("create");
};

exports.postCreateCube = (req, res) => {
  let cube = new Cube(
    req.body.name,
    req.body.description,
    req.body.imageUrl,
    req.body.difficultyLevel
  );
  Cube.save(cube);
  res.redirect("/");
};

exports.getDetails = (req, res) => {
  let cubeId = Number(req.params.cubeId);

  if (!cubeId) {
    return res.redirect("/404");
  }

  let cube = db.cubes.find((x) => x.id === cubeId);

  if (!cube) {
    return res.redirect("/404");
  }
  res.render("details", { cube });
};
