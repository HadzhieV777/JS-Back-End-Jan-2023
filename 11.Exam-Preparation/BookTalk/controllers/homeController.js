const homeController = require("express").Router();


homeController.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});

homeController.get("/catalog", (req, res) => {
  res.render("catalog", {
    title: "Catalog",
  });
});

module.exports = homeController;
