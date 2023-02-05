const jwt = require("../lib/jsonwebtoken");
const config = require("../config/config");

try {
  const decodedToken = await jwt.verify(token, config.development.SECRET);
} catch (err) {
  console.log(err);
  return res.redirect("/404");
}

exports.auth = (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    res.redirect("/404");
  }
};
