const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const housingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [6, "Name must be at least 6 characters long!"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Apartment", "Villa", "House"],
    },
    year: {
      type: Number,
      required: true,
      min: [1850, "The estate cannot be older than 1850!"],
      max: [2023, "We are yet year 2023!"],
    },
    city: {
      type: String,
      required: true,
      minLength: [4, "The City should be at least 4 characters long!"],
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: "Image URL is not valid!",
      },
    },
    description: {
      type: String,
      required: true,
      maxLength: [60, "Description should be a maximum of 60 characters long!"],
    },
    availablePieces: {
      type: Number,
      required: true,
      min: [0, "Available pieces cannot be negative number!"],
      max: [10, "Available pieces cannot exceed 10!"],
    },
    tenants: { type: [Types.ObjectId], ref: "User", default: [] },
    owner: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Housing = model("Housing", housingSchema);

module.exports = Housing;
