const asyncHandler = require('express-async-handler')
const path = require("path");

// models
const Book = require("../models/Book");
const Category = require("../models/Category");

// my custom error
const MyError = require("../utils/myError");

// my paginate
const paginate = require("../utils/paginate");

// api/v1/books
exports.getBooks = asyncHandler(async (req, res, next) => {

  // queries
  const select = req.query.select;
  const sort = req.query.sort
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  ["select", "sort", "page", "limit"].forEach(el => delete req.query[el]);

  // Pagenation
  const pagination = await paginate(Book, page, limit)

  const books = await Book.find(req.query, select)
    .populate({
      path: "category",
      select: "name averagePrice",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
    pagination,
  })

});

// api/v1/categories/:id/books
exports.getCategoryBooks = asyncHandler(async (req, res, next) => {

  // queries
  const select = req.query.select;
  const sort = req.query.sort
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;

  ["select", "sort", "page", "limit"].forEach(el => delete req.query[el]);

  // Pagenation
  const pagination = await paginate(Book, page, limit)

  const books = await Book.find({ ...req.query, category: req.params.categoryId }, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
    pagination,
  })

});

exports.getBook = asyncHandler(async (req, res, next) => {

  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй.", 404);
  }

  res.status(200).json({
    success: true,
    data: book,
  });

});

exports.createBook = asyncHandler(async (req, res, next) => {

  const categories = await Category.findById(req.body.category)

  if (!categories) {
    throw new MyError(req.body.category + " ID-тэй категори байхгүй.", 404);
  }

  req.body.createUser = req.userId;

  const book = await Book.create(req.body)

  res.status(200).json({
    success: true,
    data: book,
  })

});

exports.updateBook = asyncHandler(async (req, res, next) => {

  req.body.updateUser = req.userId;

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй.", 404);
  }

  res.status(200).json({
    success: true,
    data: book,
  });

});

exports.deleteBook = asyncHandler(async (req, res, next) => {

  const book = await Book.findById(req.params.id);
  let catId = book.category

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй.", 404);
  }

  // mongoose дээр update орж pre remove function ажиллахгүй болсон тул
  // тухайн номыг устгаад дараа нь Category Average Price function дуудаж дундажийг гаргаж байна!
  book.deleteOne();
  Book.computeCategoryAveragePrice(catId);

  res.status(200).json({
    success: true,
    msg: "Successful"
  });

});

// PUT: api/v1/books/:id/photo
exports.uploadBookPhoto = asyncHandler(async (req, res, next) => {

  const book = await Book.findByIdAndUpdate(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй.", 404);
  }

  // image upload
  // book.photo = null
  const file = req.files.file
  if (file && !file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг оруулна уу", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_IMAGE_SIZE) {
    throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна", 400);
  }

  let ext = path.parse(file.name).ext
  file.name = `photo_${req.params.id}.${ext}`
  file.mv(`${process.env.IMAGE_UPLOAD_PATH}/${file.name}`, err => {
    if (err) {
      throw new MyError("Файлыг хуулах явцад алдаа гарлаа", 400);
    }

    book.photo = file.name;
    book.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });

  });

});
