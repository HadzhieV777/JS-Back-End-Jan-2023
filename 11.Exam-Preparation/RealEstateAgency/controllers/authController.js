const { register, login } = require("../services/userService");
const { parseError } = require("../utils/parser");
const { isUser, isGuest } = require("../middlewares/guards");
const authController = require("express").Router();

authController.get("/register", isGuest(), (req, res) => {
  res.render("auth/register", {
    title: "Register Page",
  });
});

authController.post("/register", async (req, res) => {
  try {
    if (
      req.body.name == "" ||
      req.body.username == "" ||
      req.body.password == ""
    ) {
      throw new Error("All fields are required!");
    }

    if (req.body.password.length < 4) {
      throw new Error("Password must be at least 4 characters long!");
    }

    if (req.body.password != req.body.rePass) {
      throw new Error("Passwords not match!");
    }

    const token = await register(
      req.body.name,
      req.body.username,
      req.body.password
    );

    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);

    res.render("auth/register", {
      title: "Register Page",
      errors,
      body: {
        name: req.body.name,
        username: req.body.username,
      },
    });
  }
});

authController.get("/login", isGuest(), (req, res) => {
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
    res.redirect("/");
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

authController.get("/logout", isUser(), (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = authController;
