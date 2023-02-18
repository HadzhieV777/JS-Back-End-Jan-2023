const cryptoController = require("express").Router();
const {
  create,
  getById,
  update,
  deleteById,
  purchase,
  getAll,
} = require("../services/cryptoService");
const { parseError } = require("../utils/parser");

cryptoController.get("/create", (req, res) => {
  res.render("crypto/create", {
    title: "Add Crypto",
  });
});

cryptoController.post("/create", async (req, res) => {
  const crypto = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: Number(req.body.price),
    description: req.body.description,
    payment: req.body.payment,
    owner: req.user._id,
  };

  try {
    if (Object.values(crypto).some((v) => !v)) {
      throw new Error("All fields are required!");
    }

    await create(crypto);
    res.redirect("/catalog");
  } catch (error) {
    res.render("crypto/create", {
      title: "Add Crypto",
      body: crypto,
      errors: parseError(error),
    });
  }
});

cryptoController.get("/:id/edit", async (req, res) => {
  const crypto = await getById(req.params.id);

  if (crypto.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("crypto/edit", {
    title: "Crypto Edit",
    crypto,
  });
});

cryptoController.post("/:id/edit", async (req, res) => {
  const crypto = await getById(req.params.id);

  if (crypto.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  const editedCrypto = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: Number(req.body.price),
    description: req.body.description,
    payment: req.body.payment,
  };

  try {
    if (Object.values(editedCrypto).some((v) => !v)) {
      throw new Error("All fields are required!");
    }
    await update(req.params.id, editedCrypto);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("crypto/edit", {
      title: "Crypto Edit",
      hotel: Object.assign(editedCrypto, { _id: req.params.id }),
      errors: parseError(error),
    });
  }
});

cryptoController.get("/:id/delete", async (req, res) => {
  // const crypto = await getById(req.params.id);

  // if (crypto.owner != req.user._id) {
  //  return res.redirect("/auth/login");
  // }

  await deleteById(req.params.id);
  res.redirect("/catalog");
});

cryptoController.get("/:id/purchase", async (req, res) => {
  const crypto = await getById(req.params.id);

  try {
    if (crypto.owner == req.user._id) {
      crypto.isOwner = true;
      throw new Error("Cannot purchase your own coins!");
    }

    await purchase(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("crypto/details", {
      title: "Crypto Details",
      crypto,
      errors: parseError(error),
    });
  }
});

cryptoController.get("/search", async (req, res) => {
  const { search, paymentMethod } = req.query;
  const cryptos = await getAll(search, paymentMethod);

  res.render("crypto/search", { title: "Search", cryptos, search });
});

module.exports = cryptoController;
