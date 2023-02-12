const { getAll, getById } = require("../services/cryptoService");

const homeController = require("express").Router();

homeController.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    user: req.user,
  });
});

homeController.get("/catalog", async (req, res) => {
  const cryptos = await getAll();
  res.render("catalog", {
    title: "Catalog",
    cryptos,
  });
});

homeController.get("/details/:id", async (req, res) => {
  const crypto = await getById(req.params.id);

  if (req.user) {
    crypto.hasUser = true;
  }

  if (req.user) {
    if (crypto.owner == req.user._id) {
      crypto.isOwner = true;
    } else if (
      crypto.buyers.map((b) => b.toString()).includes(req.user._id.toString())
    ) {
      crypto.isPurchased = true;
    }
  }

  res.render("crypto/details", {
    title: "Crypto Details",
    crypto,
  });
});

module.exports = homeController;
