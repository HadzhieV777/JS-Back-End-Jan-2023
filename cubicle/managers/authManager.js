const User = require("../models/User");

exports.getByUsername = (username) => User.findOne({ username });

exports.register = async (username, plainPass) => {
  User.create(username, plainPass);
};
