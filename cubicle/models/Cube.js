const { Schema, model } = require("mongoose");

const cubeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50, // Check length
  },
  imageUrl: {
    type: String,
    required: true,
    // TODO add http/https validation
  },
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  // Accessories - (ObjectId, ref Accessories Model)
});

const Cube = model("Cube", cubeSchema);

module.exports = Cube;
