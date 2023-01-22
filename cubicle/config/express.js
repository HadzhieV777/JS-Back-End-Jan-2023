const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require("./routes");

module.exports = (app) => {
  // Setup the view engine
  app.engine("hbs", handlebars({
      extname: "hbs",
    })
  );
  app.set("view engine", "hbs");

  // Setup the body parser
  app.use(express.urlencoded({ extended: false }));

  // Setup the static files
  app.use(express.static("static"));

  // Setup routes   
  app.use("/", routes);

  // Handle not found   
  app.use((req, res) => {
    res.status(404).render("404");
  });
};
