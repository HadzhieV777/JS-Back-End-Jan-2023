const { register, login } = require("../services/userService");
const { parseError } = require("../utils/parser");

const authController = require("express").Router();

authController.get("/register", (req, res) => {
  // TODO replace with actual view by assignment
  res.render("auth/register", {
    title: "Register Page",
  });
});

authController.post("/register", async (req, res) => {
  try {
    if (req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }

    // TODO change rePass name if needed
    if (req.body.password != req.body.rePass) {
      throw new Error("Passwords not match!");
    }

    const token = await register(req.body.username, req.body.password);

    // TODO check assignment to see if register creates session
    res.cookie("auth", token);
    res.redirect("/"); // TODO replace with redirect by assignment
  } catch (error) {
    const errors = parseError(error);

    // TODO add error display to actual template from assignment
    res.render("auth/register", {
      title: "Register Page",
      errors,
      body: {
        username: req.body.username,
      },
    });
  }
});

authController.get("/login", (req, res) => {
  // TODO replace with actual view by assignment
  res.render("auth/login", {
    title: "Login Page",
  });
});

authController.post("/login", async (req, res) => {
  try {
    if (req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }

    const token = await login(req.body.username, req.body.password);

    res.cookie("auth", token);
    res.redirect("/"); // TODO replace with redirect by assignment
  } catch (error) {
    const errors = parseError(error);
    res.render("auth/login", {
      title: "Login Page",
      errors,
      body: {
        username: req.body.username,
      },
    });
  }
});

authController.get('/logout', (req, res) => {
  res.clearCookie('auth')
  res.redirect("/");
})

module.exports = authController;
