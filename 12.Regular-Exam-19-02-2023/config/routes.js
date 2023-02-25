const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const photoController = require("../controllers/photoController");
const profileController = require("../controllers/profileController");

const { isUser } = require("../middlewares/guards");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/photos", isUser(), photoController);
  app.use("/profile", isUser(), profileController);

  app.use("*", (req, res) => {
    res.render("404");
  });
};
