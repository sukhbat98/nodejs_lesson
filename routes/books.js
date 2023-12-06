const express = require("express");

const {
  protect,
  authorize
} = require("../middleware/protect");

const router = express.Router();

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadBookPhoto
} = require("../controller/books")

// ** api/v1/books
router.route("/")
  .get(getBooks)
  .post(protect, authorize("admin", "operator"), createBook)

router.route("/:id")
  .get(getBook)
  .put(protect, authorize("admin", "operator"), updateBook)
  .delete(protect, authorize("admin", "operator"), deleteBook)

router.route("/:id/photo")
  .put(protect, authorize("admin", "operator"), uploadBookPhoto)

module.exports = router;
