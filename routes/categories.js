const express = require("express");

const booksRoutes = require('./books');

const router = express.Router();

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("./../controller/categories");
const { route } = require("./books");

router.route("/")
    .get(getCategories)
    .post(createCategory)

router.route("/:id")
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory)

// ** api/v1/categories/:categoryId/books
router.use("/:categoryId/books", booksRoutes);


module.exports = router;
