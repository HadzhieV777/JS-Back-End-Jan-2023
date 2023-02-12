const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const cryptoController = require("../controllers/cryptoController");
const { isUser } = require("../middlewares/guards");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use('/crypto', isUser(), cryptoController)

  // Handle not found
  app.use('*', (req, res) => {
    res.render('404');
})
};
