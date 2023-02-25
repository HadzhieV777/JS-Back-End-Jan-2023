const homeController = require("express").Router();
const { getAll, getById, getOnlyPic } = require("../services/photoService");

homeController.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.user,
  });
});

homeController.get("/catalog", async (req, res) => {
  const photos = await getAll();

  res.render("catalog", {
    title: "Catalog",
    photos,
  });
});

homeController.get("/details/:id", async (req, res) => {
  const checkPhoto = await getOnlyPic(req.params.id);
  const photo = await getById(req.params.id);

  if (req.user) {
    photo.hasUser = true;

    if (checkPhoto.owner == req.user._id) {
      photo.isOwner = true;
    }
  }

  if (photo.commentList) {
    photo.commentList.forEach((comment) => {
      if (comment.userID) {
        comment.username = comment.userID.username;
      }
    });
  }

  res.render("pets/details", {
    title: "Pet Details",
    photo,
  });
});

module.exports = homeController;
