const housingController = require("express").Router();
const {
  create,
  getById,
  update,
  deleteById,
} = require("../services/housingService");
const { parseError } = require("../utils/parser");

housingController.get("/create", (req, res) => {
  res.render("housing/create", {
    title: "Create Offer",
  });
});

housingController.get(":id/edit", async (req, res) => {
  const housing = await getById(req.params.id);

  if (housing.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("housing/edit", {
    title: "Edit Offer",
    housing,
  });
});

module.exports = housingController;
