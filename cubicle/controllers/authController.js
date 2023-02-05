const router = require("express").Router();

const authManager = require("../managers/authManager");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.redirect("/404");
  }

  const existingUser = await authManager.getByUsername(username);
  if (existingUser) {
    return res.redirect("/404");
  }

  const user = await authManager.register(username, password);

  console.log(user);
  res.redirect("/auth/login");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authManager.login(username, password);
    res.cookie("auth", token);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

module.exports = router;
