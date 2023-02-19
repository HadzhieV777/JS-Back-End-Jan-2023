const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "asd2as78asd83dxv32sd";

async function register(name, username, password) {
  const existing = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (existing) {
    throw new Error("Username is taken!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    hashedPassword,
  });

  //   TODO see assignment if registration creates user session

  return createSession(user);
}

async function login(username, password) {
  const user = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (!user) {
    throw new Error("Invalid username or password!");
  }

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    throw new Error("Invalid username or password!");
  }

  return createSession(user);
}

function createSession({ _id, username }) {
  const payload = {
    _id,
    username,
  };

  return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  login,
  verifyToken,
};
