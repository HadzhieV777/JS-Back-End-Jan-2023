const db = require("../config/database.json");

exports.getHomePage = (req, res) => {
  let cubes = db.cubes;
  const { search, from, to } = req.query;

  if (search) {
    cubes = cubes.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (from) {
    cubes = cubes.filter((cube) => cube.difficultyLevel >= from);
  }

  if (to) {
    cubes = cubes.filter((cube) => cube.difficultyLevel <= to);
  }

  res.render("index", { cubes, search, from, to });
};

exports.getAboutPage = (req, res) => {
  res.render("about");
};
