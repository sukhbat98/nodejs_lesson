const Category = require("../models/Category");

exports.getCategories = async(req, res, next) => {

    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data: categories,
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err,
        })
    }
}

exports.getCategory = async(req, res, next) => {

    try {
        const categories = await Category.findById(req.params.id);

        if (!categories) {
            return res.status(400).json({
                success: false,
                error: req.params.id + " ID-тэй категори байхгүй.",
            })
        }

        res.status(200).json({
            success: true,
            data: categories,
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err,
        })
    }
}

exports.createCategory = async(req, res, next) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json({
            success: true,
            data: category,
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err,
        })
    }
}

exports.updateCategory = async(req, res, next) => {

    try {
        const categories = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!categories) {
            return res.status(400).json({
                success: false,
                error: req.params.id + " ID-тэй категори байхгүй.",
            })
        }

        res.status(200).json({
            success: true,
            data: categories,
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err,
        })
    }
    res.status(200).json({
        success: true,
        data: `${req.params.id} id-тэй категорийг шинэчлэх`,

    })
}

exports.deleteCategory = async(req, res, next) => {

    try {
        const categories = await Category.findByIdAndDelete(req.params.id);

        if (!categories) {
            return res.status(400).json({
                success: false,
                error: req.params.id + " ID-тэй категори байхгүй.",
            })
        }

        return res.status(200).json({
            success: true,
            data: categories,
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err,
        })
    }
}
