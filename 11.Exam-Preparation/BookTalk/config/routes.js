const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const bookController = require("../controllers/bookController");
const { isUser } = require("../middlewares/guards");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/books", isUser(), bookController);

  app.use("*", (req, res) => {
    res.render("404");
  });
};
