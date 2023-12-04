const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadBookPhoto
} = require("./../controller/books")

// ** api/v1/books
router.route("/")
  .get(getBooks)
  .post(createBook)

router.route("/:id")
  .get(getBook)
  .put(updateBook)
  .delete(deleteBook)

router.route("/:id/photo")
  .put(uploadBookPhoto)

module.exports = router;
