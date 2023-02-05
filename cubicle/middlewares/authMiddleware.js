const jwt = require("../lib/jsonwebtoken");
const config = require("../config/config");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, config.development.SECRET);
    } catch (err) {
      console.log(err);
      return res.redirect("/404");
    }
  }
};
