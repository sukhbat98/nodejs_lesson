const express = require("express");

// my imports
const { getCategoryBooks } = require('../controller/books');

const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("./../controller/categories");

// api/v1/categories/:categoryId/books
router.use("/:categoryId/books", getCategoryBooks);

router.route("/")
  .get(getCategories)
  .post(createCategory)

router.route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory)

module.exports = router;
