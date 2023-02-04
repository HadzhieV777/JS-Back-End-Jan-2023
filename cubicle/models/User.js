const { Schema, model, Types } = require("mongoose");

const cubeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: S,
    required: true,
  },
});
