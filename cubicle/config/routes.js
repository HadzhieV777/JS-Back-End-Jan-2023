const express = require('express')
const Router = express.Router
const cubeController = require("../controllers/cubeController");

const router = Router()
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  app.get("/create", cubeController.getCreateCube);
};

module.exports = router