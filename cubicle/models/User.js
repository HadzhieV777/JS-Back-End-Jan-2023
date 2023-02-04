const { Schema, model, Types } = require("mongoose");

const cubeSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});
