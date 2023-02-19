const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const housingController = require("../controllers/housingController");
const { isUser } = require("../middlewares/guards");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/housing", isUser(), housingController);

  app.use("*", (req, res) => {
    res.render("404");
  });
};
