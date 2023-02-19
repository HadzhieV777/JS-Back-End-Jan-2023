const { Schema, model } = require("mongoose");

const NAME_PATTERN = /[A-Z][a-z]+\s[A-Z][a-z]+/

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => NAME_PATTERN.test(value),
      message: "Name is not valid!",
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Username must be at least 3 characters long!"],
  },
  hashedPassword: { type: String, required: true },
});

userSchema.index(
  { username: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
