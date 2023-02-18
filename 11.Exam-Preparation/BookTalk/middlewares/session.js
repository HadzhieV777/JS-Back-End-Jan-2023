const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
  const token = req.cookies.auth;
  if (token) {
    try {
      const userData = verifyToken(token);
      req.user = userData;
      res.locals.username = userData.username;
    } catch (error) {
      res.clearCookie("auth");
      res.redirect("/auth/login");
      return;
    }
  }

  next();
};
