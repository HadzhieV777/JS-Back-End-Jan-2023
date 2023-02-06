const { Schema, model, Types, default: mongoose } = require("mongoose");

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
    validate: {
      validator: function (value) {
        return value.startsWith("http://") || value.startsWith("https://");
      },
      message: "URL is invalid!",
    },
  },
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  accessories: [
    {
      type: Types.ObjectId,
      ref: "Accessory",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Cube = model("Cube", cubeSchema);

module.exports = Cube;
