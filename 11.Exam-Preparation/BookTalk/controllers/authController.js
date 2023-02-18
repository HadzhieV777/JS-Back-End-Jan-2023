const validator = require("validator");
const { register, login } = require("../services/userService");
const { parseError } = require("../utils/parser");

const authController = require("express").Router();

authController.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
  });
});

authController.post("/register", async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      throw new Error("Invalid Email!");
    }

    if (req.email == "" || req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }

    if (req.body.password.length < 3) {
      throw new Error("Password must be at least 3 characters long!");
    }

    if (req.body.password != req.body.rePass) {
      throw new Error("Passwords not match!");
    }

    const token = await register(
      req.body.email,
      req.body.username,
      req.body.password
    );

    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);

    res.render("auth/register", {
      title: "Register",
      errors,
      body: {
        email: req.body.email,
        username: req.body.username,
      },
    });
  }
});

authController.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
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
      title: "Login",
      errors,
      body: {
        email: req.body.email,
      },
    });
  }
});

authController.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

authController.get("/profile", (req, res) => {
  res.render("auth/profile", {
    title: "Profile",
  });
});

module.exports = authController;
