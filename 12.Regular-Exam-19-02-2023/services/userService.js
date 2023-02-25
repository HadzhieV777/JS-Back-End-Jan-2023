const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "asd2as78asd83dxv32sd";

async function register(username, email, password) {
  const existingUsername = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingUsername) {
    throw new Error("Username is taken!");
  }

  const existingEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingEmail) {
    throw new Error("Email is taken!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    hashedPassword,
  });

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

function createSession({ _id, username, email }) {
  const payload = {
    _id,
    username,
    email,
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
