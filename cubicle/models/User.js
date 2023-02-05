const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long!"],
  },
});

// Hash password
userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;

    next();
  });
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
});

const User = model("User", userSchema);

module.exports = User;
