const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;
const cryptoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [2, "Name must be at least 2 characters long!"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "Image URL is not valid!",
    },
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be positive number!"],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Description must be at least 10 characters long!"],
  },
  payment: { type: String, required: true },
  buyers: { type: [Types.ObjectId], ref: "User", default: [] },
  owner: { type: Types.ObjectId, ref: "User", required: true },
});

cryptoSchema.index(
  { name: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const Crypto = model("Crypto", cryptoSchema);

module.exports = Crypto;
