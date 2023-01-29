const Cube = require("../models/Cube");

exports.getHomePage = async (req, res) => {
  // ,lean() return objecst as pure Objects not Documents
  let cubes = await Cube.find().lean();

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
