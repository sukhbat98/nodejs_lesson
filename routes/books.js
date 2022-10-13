const express = require("express");

const router = express.Router({ mergeParams: true });

const {
    getBooks,
    // getCategory,
    // createCategory,
    // updateCategory,
    // deleteCategory,
} = require("./../controller/books")

// ** api/v1/books
router.route("/")
    .get(getBooks)
    // .post(createCategory)

// router.route("/:id")
//     .get(getCategory)
//     .put(updateCategory)
//     .delete(deleteCategory)

module.exports = router;
