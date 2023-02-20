const Book = require("../models/Book");

async function getAll() {
  return Book.find({}).lean();
}

async function getById(id) {
  return Book.findById(id).lean();
}

async function getByUserWishlist(userId) {
  return Book.find({ wishList: userId }).lean();
}

async function create(hotel) {
  return await Book.create(hotel);
}

async function update(id, book) {
  const existing = await Book.findById(id);

  existing.title = book.title;
  existing.author = book.author;
  existing.genre = book.genre;
  existing.stars = book.stars;
  existing.imageUrl = book.imageUrl;
  existing.review = book.review;

  await existing.save();
}

async function deleteById(id) {
  await Book.findByIdAndRemove(id);
}

async function addToWishList(bookId, userId) {
  const book = await Book.findById(bookId);

  if (book.wishList.includes(userId)) {
    throw new Error("Cannot add twice!");
  }

  book.wishList.push(userId);

  await book.save();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getByUserWishlist,
  addToWishList,
};
