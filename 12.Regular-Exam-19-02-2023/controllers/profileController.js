const profileController = require("express").Router();
const User = require('../models/User')

profileController.get("/", async (req, res) => {
  const user = await User.findById(req.user._id).lean();
  res.render("auth/profile", {
    title: "Profile",
    user,
  });
});

module.exports = profileController;
