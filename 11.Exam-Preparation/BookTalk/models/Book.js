const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [2, "Book title must be at least 2 characters long!"],
  },
  author: {
    type: String,
    required: true,
    minLength: [5, "Author name must be at least 5 characters long!"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required!"],
    minLength: 3,
  },
  stars: {
    type: Number,
    required: true,
    min: [1, "Stars should be between 1 and 5"],
    max: [5, "Stars should be between 1 and 5"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "Image URL is not valid!",
    },
  },
  review: {
    type: String,
    required: true,
    minLength: [10, "Review must contains at least 10 characters!"],
  },
  wishList: { type: [Types.ObjectId], ref: "User", default: [] },
  owner: { type: Types.ObjectId, ref: "User", required: true },
});

const Book = model("Book", bookSchema);

module.exports = Book;
