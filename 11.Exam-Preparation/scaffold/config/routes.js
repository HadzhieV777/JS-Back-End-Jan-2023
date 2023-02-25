const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);


// TODO: If not 404 remove this
  app.use("*", (req, res) => {
    res.render("404");
  });
};
