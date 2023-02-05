const util = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

exports.getByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
  const user = await this.getByUsername(username);

  const isValid = await user.validatePassword(password);

  // (!(!user && !isValid))
  if (!user || !isValid) {
    throw "Invalid username or password!";
  }

  const payload = { username: user.username };
  const token = jwt.sign(payload, config.development.SECRET, {
    expiresIn: "2h",
  });

  return token;
};
