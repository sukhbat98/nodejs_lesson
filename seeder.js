const fs = require("fs");

const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// models
const Category = require("./models/Category");

// configs
dotenv.config({ path: "./config/config.env" });

// connect db
mongoose.connect(process.env.MONGODB_URI)

const categories = JSON.parse(fs.readFileSync(__dirname + '/data/categories.js', "utf-8"));

const importData = async () => {
    try {
        await Category.create(categories);
        console.log("Категорийн өгөгдлүүдийг орууллаа...".green.inverse);
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await Category.deleteMany();
        console.log("Категорийн өгөгдлүүдийг устгалаа...".red.inverse);
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] == '-i') {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}