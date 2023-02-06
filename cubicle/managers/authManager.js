const User = require("../models/User");
const config = require("../config/config");

const jwt = require("../lib/jsonwebtoken");

exports.getByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
  const user = await this.getByUsername(username);

  const isValid = await user.validatePassword(password);

  // (!(!user && !isValid))
  if (!user || !isValid) {
    throw "Invalid username or password!";
  }

  const payload = { _id: user._id, username: user.username };
  const token = await jwt.sign(payload, config.development.SECRET, {
    expiresIn: "2h",
  });

  return token;
};
