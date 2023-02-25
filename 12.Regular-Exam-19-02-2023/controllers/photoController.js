const photoController = require("express").Router();
const {
  create,
  getOnlyPic,
  update,
  deleteById,
  addCommentToPhoto,
} = require("../services/photoService");
const { parseError } = require("../utils/parser");

photoController.get("/create", (req, res) => {
  res.render("pets/create", {
    title: "Add Photo",
  });
});

photoController.post("/create", async (req, res) => {
  const photo = {
    name: req.body.name,
    age: Number(req.body.age),
    description: req.body.description,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
    owner: req.user._id,
  };

  try {
    if (Object.values(photo).some((v) => !v)) {
      throw new Error("All fields are required!");
    }

    await create(photo);
    res.redirect("/catalog");
  } catch (error) {
    res.render("pets/create", {
      title: "Add Photo",
      errors: parseError(error),
    });
  }
});

photoController.get("/:id/edit", async (req, res) => {
  const photo = await getOnlyPic(req.params.id);

  if (photo.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("pets/edit", {
    title: "Edit Photo",
    photo,
  });
});

photoController.post("/:id/edit", async (req, res) => {
  const photo = await getOnlyPic(req.params.id);

  if (photo.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  const editedPhoto = {
    name: req.body.name,
    age: req.body.age,
    description: req.body.description,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
  };

  try {
    if (Object.values(editedPhoto).some((v) => !v)) {
      throw new Error("All fields are required!");
    }
    await update(req.params.id, editedPhoto);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("pets/edit", {
      title: "Edit Photo",
      hotel: Object.assign(editedPhoto, { _id: req.params.id }),
      errors: parseError(error),
    });
  }
});

photoController.get("/:id/delete", async (req, res) => {
  await deleteById(req.params.id);
  res.redirect("/catalog");
});

photoController.post("/:id/comments", async (req, res) => {
  const photoId = req.params.id;
  const userId = req.user._id;
  const comment = req.body.text;

  await addCommentToPhoto(photoId, userId, comment);

  res.redirect(`/details/${photoId}`);
});

module.exports = photoController;
