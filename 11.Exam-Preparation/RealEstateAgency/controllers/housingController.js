const housingController = require("express").Router();
const {
  create,
  getById,
  update,
  deleteById,
  rent,
  filter
} = require("../services/housingService");
const { parseError } = require("../utils/parser");

housingController.get("/create", (req, res) => {
  res.render("housing/create", {
    title: "Create Offer",
  });
});

housingController.post("/create", async (req, res) => {
  const housing = {
    name: req.body.name,
    type: req.body.type,
    year: Number(req.body.year),
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    availablePieces: req.body.availablePieces,
    owner: req.user._id,
  };

  try {
    if (Object.values(housing).some((v) => !v)) {
      throw new Error("All fields are required!");
    }

    await create(housing);
    res.redirect("/available");
  } catch (error) {
    res.render("housing/create", {
      title: "Create Offer",
      errors: parseError(error),
    });
  }
});

housingController.get("/:id/edit", async (req, res) => {
  const housing = await getById(req.params.id);

  if (housing.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("housing/edit", {
    title: "Edit Offer",
    housing,
  });
});

housingController.post("/:id/edit", async (req, res) => {
  const housing = await getById(req.params.id);

  if (housing.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  const editedHousing = {
    name: req.body.name,
    type: req.body.type,
    year: req.body.year,
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    availablePieces: req.body.availablePieces,
  };

  try {
    if (Object.values(editedHousing).some((v) => !v)) {
      throw new Error("All fields are required!");
    }
    await update(req.params.id, editedHousing);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("housing/edit", {
      title: "Crypto Edit",
      hotel: Object.assign(editedHousing, { _id: req.params.id }),
      errors: parseError(error),
    });
  }
});

housingController.get("/:id/delete", async (req, res) => {
  await deleteById(req.params.id);
  res.redirect("/available");
});

housingController.get('/:id/rent', async (req, res) => {
  const housing = await getById(req.params.id);

  try {
    if (housing.owner == req.user._id) {
      housing.isOwner = true;
      throw new Error("Cannot rent your property!");
    }

    await rent(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("housing/details", {
      title: "Housing Details",
      housing,
      errors: parseError(error),
    });
  }
})

housingController.get("/search", async (req, res) => {
  res.render("housing/search", {
    title: "Search for Offers",
  });
});

housingController.post('/search', async (req, res) => {
  const { type } = req.body;

  const housings = await filter(type);

  res.render('housing/search', {
  title: "Search for Offers",
  housings})

})
module.exports = housingController;
