const User = require("../models/User");

exports.getByUsername = (username) => User.findOne({ username });

exports.register = (username, plainPass) =>
  User.create({ username, plainPass });
