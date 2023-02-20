const {
  getById,
  create,
  update,
  deleteById,
  addToWishList,
} = require("../services/bookService");

const { parseError } = require("../utils/parser");

const bookController = require("express").Router();

bookController.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Create Review",
  });
});

bookController.post("/create", async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    stars: Number(req.body.stars),
    imageUrl: req.body.imageUrl,
    review: req.body.review,
    owner: req.user._id,
  };

  try {
    if (Object.values(book).some((v) => !v)) {
      throw new Error("All fields are required!");
    }
    await create(book);
    res.redirect("/catalog");
  } catch (error) {
    res.render("books/create", {
      title: "Create Review",
      body: book,
      errors: parseError(error),
    });
  }
});

bookController.get("/:id/edit", async (req, res) => {
  const book = await getById(req.params.id);

  if (book.owner != req.user._id) {
    return res.redirect("/auth/login");
  }
  res.render("books/edit", {
    title: "Edit Book",
    book,
  });
});

bookController.post("/:id/edit", async (req, res) => {
  const book = await getById(req.params.id);

  if (book.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  const editedBook = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    stars: Number(req.body.stars),
    imageUrl: req.body.imageUrl,
    review: req.body.review,
  };

  try {
    if (Object.values(editedBook).some((v) => !v)) {
      throw new Error("All fields are required!");
    }
    await update(req.params.id, editedBook);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("books/edit", {
      title: "Edit Review",
      book: Object.assign(editedBook, { _id: req.params.id }),
      errors: parseError(error),
    });
  }
});

bookController.get("/:id/delete", async (req, res) => {
  const book = await getById(req.params.id);

  if (book.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  await deleteById(req.params.id);
  res.redirect("/catalog");
});

bookController.get("/:id/add", async (req, res) => {
  const book = await getById(req.params.id);

  try {
    if (book.owner == req.user._id) {
      book.isOwner = true;
      throw new Error("Cannot add to wishlist!");
    }

    await addToWishList(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("books/details", {
      title: "Book Details",
      book,
      errors: parseError(error),
    });
  }
});

module.exports = bookController;
