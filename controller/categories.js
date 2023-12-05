const asyncHandler = require('express-async-handler')

// models
const Category = require("../models/Category");
const Book = require("../models/Book");

const paginate = require("../utils/paginate");

// custom error
const MyError = require("../utils/myError")

exports.getCategories = asyncHandler(async (req, res, next) => {

  // queries
  const select = req.query.select;
  const sort = req.query.sort;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  ["select", "sort", "page", "limit"].forEach(el => delete req.query[el]);

  // Paginate
  const pagination = await paginate(Category, page, limit);

  const categories = await Category.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: categories,
    pagination,
  });

});

exports.getCategory = asyncHandler(async (req, res, next) => {

  const categories = await Category.findById(req.params.id).populate("books");

  if (!categories) {
    throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 404);
  }

  res.status(200).json({
    success: true,
    data: categories,
  });

});

exports.createCategory = asyncHandler(async (req, res, next) => {

  const category = await Category.create(req.body)
  res.status(200).json({
    success: true,
    data: category,
  })

});

exports.updateCategory = asyncHandler(async (req, res, next) => {

  const categories = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!categories) {
    throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 404);
  }

  res.status(200).json({
    success: true,
    data: categories,
  });

});

exports.deleteCategory = asyncHandler(async (req, res, next) => {

  const categories = await Category.findById(req.params.id);

  if (!categories) {
    throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 404);
  }

  try {
    // Delete related child documents
    await Book.deleteMany({ category: categories._id });
    await Category.deleteOne({ _id: req.params.id })
  }
  catch (err) {
    throw new MyError(String(err));
  }

  res.status(200).json({
    success: true,
    msg: "Амжилттай устлаа",
  });

});
