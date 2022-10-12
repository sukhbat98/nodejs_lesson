const mongoose = require("mongoose");

const CategoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Категорийн нэрийг оруулна уу"],
        unique: true,
        trim: true,
        maxlength: [50, "Категорийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой."],
    },
    description: {
        type: String,
        required: [true, "Категорийн тайлбарийг заавал оруулах ёстой."],
        maxlength: [500, "Категорийн тайлбарийн урт дээд тал нь 500 тэмдэгт байх ёстой."],
    },
    photo: {
        type: String,
        default: "no-photo.jpg",
    },
    averageRating: {
        type: Number,
        min: [1, "Рэйтинг хамгийн багадаа 1 байх ёстой"],
        max: [10, "Рэйтинг хамгийн ихдээ 10 байх ёстой"],
    },
    averagePrice: Number,
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Category", CategoryShema);
