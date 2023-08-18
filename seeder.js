const fs = require("fs");

const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// models
const Category = require("./models/Category");
const Book = require("./models/Book");

// configs
dotenv.config({ path: "./config/config.env" });

// connect db
mongoose.connect(process.env.MONGODB_URI)

const categories = JSON.parse(fs.readFileSync(__dirname + '/data/categories.js', "utf-8"));
const books = JSON.parse(fs.readFileSync(__dirname + '/data/books.js', "utf-8"));

async function importData() {
    try {
        await Category.create(categories);
        await Book.create(books);
        console.log("Өгөгдлүүдийг орууллаа...".green.inverse);
        exit();
    } catch (err) {
        console.log(err);
    }
};

async function deleteData() {
    try {
        await Category.deleteMany();
        await Book.deleteMany();
        console.log("Өгөгдлүүдийг устгалаа...".red.inverse);
        exit();
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] == '-i') {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}

/**
 * Exit program
 */
function exit() {
    console.log('Seeder script completed.'.green.bold);
    process.exit(); // Exit the script
}
