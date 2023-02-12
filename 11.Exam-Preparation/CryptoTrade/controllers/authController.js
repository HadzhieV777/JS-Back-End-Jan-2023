const validator = require("validator");
const { isUser } = require("../middlewares/guards");
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
    if (!validator.isEmail(req.body.email)) {
      throw new Error("Invalid Email!");
    }
    if (
      req.body.username == "" ||
      req.body.password == "" ||
      req.body.email == ""
    ) {
      throw new Error("All fields are required!");
    }

    if (req.body.password.length < 5) {
      throw new Error("Password must be at least 5 characters long!");
    }

    if (req.body.password != req.body.rePass) {
      throw new Error("Passwords not match!");
    }

    const token = await register(
      req.body.username,
      req.body.email,
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
        username: req.body.username,
        email: req.body.email,
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
    if (req.body.email == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }

    const token = await login(req.body.email, req.body.password);

    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    res.render("auth/login", {
      title: "Login Page",
      errors,
      body: {
        email: req.body.email,
      },
    });
  }
});

authController.get("/logout", isUser(), (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = authController;
