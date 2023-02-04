const User = require("../models/User");

exports.getByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });
