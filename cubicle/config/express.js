const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const cookieParser = require("cookie-parser");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (app) => {
  // Setup the view engine
  const hbs = handlebars.create({
    extname: "hbs",
    partialsDir: path.join(__dirname, "../views/partials"),
    defaultLayout: "main",
  });

  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");

  // Setup the body parser
  app.use(express.urlencoded({ extended: false }));

  // Setup cookie-parser
  app.use(cookieParser());

  // Setup auth middleware
  app.use(authMiddleware.auth);

  // Setup the static files
  app.use(express.static("static"));

  // Setup routes
  app.use("/", routes);

  // Handle not found
  app.use((req, res) => {
    res.status(404).render("404");
  });
};
