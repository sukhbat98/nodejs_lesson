const express = require("express");

const router = express.Router({ mergeParams: true });

const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
} = require("./../controller/books")

// ** api/v1/books
router.route("/")
    .get(getBooks)
    .post(createBook)

router.route("/:id")
    .get(getBook)
    .put(updateBook)
    .delete(deleteBook)

module.exports = router;
