const profileController = require("express").Router();
const { isUser } = require("../middlewares/guards");
const { getByUserBooking } = require("../services/hotelService");

profileController.get("/", isUser(), async (req, res) => {
  const bookings = await getByUserBooking(req.user._id);
  res.render("auth/profile", {
    title: "Profile Page",
    user: Object.assign({ bookings: bookings.map((b) => b.name) }, req.user),
  });
});

module.exports = profileController;
