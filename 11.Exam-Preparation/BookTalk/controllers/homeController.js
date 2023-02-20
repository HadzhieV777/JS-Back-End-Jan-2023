const homeController = require("express").Router();
const { getAll, getById } = require("../services/bookService");

homeController.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});

homeController.get("/catalog", async (req, res) => {
  const books = await getAll();
  res.render("catalog", {
    title: "Catalog",
    books,
  });
});

homeController.get("/details/:id", async (req, res) => {
  const book = await getById(req.params.id);

  if (req.user) {
    book.hasUser = true;

    if (req.user) {
      if (book.owner == req.user._id) {
        book.isOwner = true;
      } else if (
        book.wishList.map((u) => u.toString()).includes(req.user._id.toString())
      ) {
        book.isWished = true;
      }
    }
  }

  res.render("books/details", {
    title: "Book Details",
    book,
  });
});

module.exports = homeController;
