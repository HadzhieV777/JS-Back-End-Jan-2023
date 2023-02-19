const homeController = require("express").Router();
const { getAll, getById, getTopHouses } = require("../services/housingService");

homeController.get("/", async (req, res) => {
  const topHouses = await getTopHouses();

  res.render("home", {
    title: "Home Page",
    topHouses,
  });
});

homeController.get("/available", async (req, res) => {
  const houses = await getAll();

  res.render("housing/recent", {
    title: "Available Houses",
    houses,
  });
});

homeController.get("/details/:id", async (req, res) => {
  const housing = await getById(req.params.id);

  if (req.user) {
    housing.hasUser = true;

    if (housing.owner == req.user._id) {
      housing.isOwner = true;
    } else if (
      housing.tenants.map((t) => t.toString()).includes(req.user._id.toString())
    ) {
      housing.isRented = true;
    }
  }

  if (housing.availablePieces > 0) {
    housing.canRent = true;
  }

  res.render("housing/details", {
    title: "Housing Details",
    housing,
  });
});

module.exports = homeController;
