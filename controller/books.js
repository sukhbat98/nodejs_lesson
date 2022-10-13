const asyncHandler = require('express-async-handler')

// models
const Book = require("../models/Book");

// custom error
const MyError = require("../utils/myError")

// api/v1/books
// api/v1/categories/:id/books
exports.getBooks = asyncHandler(async(req, res, next) => {

    // // queries
    // const select = req.query.select;
    // const sort = req.query.sort
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 100;

    // ["select", "sort", "page", "limit"].forEach( el => delete req.query[el]);

    // // Pagenation
    // const total = await Book.countDocuments();
    // const pageCount = Math.ceil(total / limit);
    // const start = (page - 1) * limit + 1;
    // let end = start + limit - 1;

    // if (end > total) end = total;

    // const pagenation = { total, pageCount, start, end, limit };

    // if (page < pageCount) pagenation.nextPage = page + 1;
    // if (page > 1) pagenation.prevPage = page - 1;

    let query;

    if (req.params.categoryId) {
        query = Book.find({ category: req.params.categoryId });
    } else {
        query = Book.find().populate({
            path: "category",
            select: "name",
        })
    }

    const books = await query;

    // const categories = await Book.find(req.query, select)
    //     .sort(sort)
    //     .skip(start - 1)
    //     .limit(limit);

    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
        // pagenation,
    })

});

exports.getCategory = asyncHandler(async(req, res, next) => {

    const categories = await Book.findById(req.params.id);

    if (!categories) {
        throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
    }

    res.status(200).json({
        success: true,
        data: categories,
    });

});

exports.createCategory = asyncHandler(async(req, res, next) => {

    const category = await Book.create(req.body)
    res.status(200).json({
        success: true,
        data: category,
    })

});

exports.updateCategory = asyncHandler(async(req, res, next) => {

    const categories = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!categories) {
        throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
    }

    res.status(200).json({
        success: true,
        data: categories,
    });

});

exports.deleteCategory = asyncHandler(async(req, res, next) => {

    const categories = await Book.findByIdAndDelete(req.params.id);

    if (!categories) {
        throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
    }

    res.status(200).json({
        success: true,
        data: categories,
    });

});
