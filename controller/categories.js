const asyncHandler = require('express-async-handler')

// models
const Category = require("../models/Category");

// custom error
const MyError = require("../utils/myError")

exports.getCategories = asyncHandler(async(req, res, next) => {

    const categories = await Category.find();
    res.status(200).json({
        success: true,
        data: categories,
    })

});

exports.getCategory = asyncHandler(async(req, res, next) => {

    const categories = await Category.findById(req.params.id);

    if (!categories) {
        throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
    }

    res.status(200).json({
        success: true,
        data: categories,
    });

});

exports.createCategory = asyncHandler(async(req, res, next) => {

    const category = await Category.create(req.body)
    res.status(200).json({
        success: true,
        data: category,
    })

});

exports.updateCategory = asyncHandler(async(req, res, next) => {

    const categories = await Category.findByIdAndUpdate(req.params.id, req.body, {
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

    const categories = await Category.findByIdAndDelete(req.params.id);

    if (!categories) {
        throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
    }

    res.status(200).json({
        success: true,
        data: categories,
    });

});
