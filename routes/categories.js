const express = require("express");

const { protect } = require("../middleware/protect");

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
  .post(protect, createCategory)

router.route("/:id")
  .get(getCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory)

module.exports = router;
