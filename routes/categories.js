const express = require("express");

const { protect, authorize } = require("../middleware/protect");

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
  .post(protect, authorize("admin"), createCategory)

router.route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin", "operator"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory)

module.exports = router;
