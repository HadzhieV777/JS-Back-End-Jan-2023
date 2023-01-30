const { Schema, model } = require("mongoose");

const accessorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    match: [/^https?:\/\//, 'Invalid URL!'], // Add http/https validation
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
});

const Accessory = model("Accessory", accessorySchema);

module.exports = Accessory;
