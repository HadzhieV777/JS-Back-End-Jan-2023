const jwt = require("../lib/jsonwebtoken");
const config = require("../config/config");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, config.development.SECRET);

      req.user = decodedToken;
    } catch (err) {
      console.log(err);
      res.clearCookie("auth");
      res.redirect("/404");
    }
  }
};
