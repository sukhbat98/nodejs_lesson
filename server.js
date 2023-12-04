const express = require("express");
const path = require("path");

const morgan = require("morgan");
const rfs = require('rotating-file-stream');

// Аппын тохиргоог process.env руу ачаалах
const dotenv = require("dotenv")

// colors
const colors = require("colors");

// file-upload
const fileupload = require("express-fileupload");

dotenv.config({ path: "./config/config.env" });

// Router оруулж ирэх
const categoriesRoutes = require("./routes/categories");
const booksRoutes = require("./routes/books");

// middleware оруулж ирэх
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error")

const connectDB = require("./config/db");

connectDB()

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// start app
const app = express();

// body parser
app.use(express.json());

// middlewares
app.use(logger);

// file upload
app.use(fileupload());

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use("/api/v1/categories/", categoriesRoutes)
app.use("/api/v1/books/", booksRoutes)
app.use(errorHandler);

const server = app.listen(
  process.env.PORT,
  console.log(`Express сервер ${process.env.PORT} порт дээр аслаа...`.rainbow.bold)
)

// Сервер дээр алдаа гарсан үед ажиллана.
process.on("unhandledRejection", (err, promise) => {
  console.log(`Сервер дээр алдаа гарлаа: ${err.message}`.red.underline.bold);
  server.close(() => {
    process.exit(1);
  });
})
