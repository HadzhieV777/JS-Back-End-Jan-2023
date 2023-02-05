const User = require("../models/User");

exports.getByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
  const user = await this.getByUsername(username);

  const isValid = await user.validatePassword(password);

  // (!(!user && !isValid))
  if (!user || !isValid) {
    throw "Invalid username or password!";
  }

  return user;
};
