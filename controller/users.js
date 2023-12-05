const asyncHandler = require('express-async-handler')
const path = require("path");

// models
const User = require("../models/User");

// my custom error
const MyError = require("../utils/myError");

// my paginate
const paginate = require("../utils/paginate");

/** User register */
exports.register = asyncHandler(async (req, res, next) => {

  const user = await User.create(req.body)

  res.status(200).json({
    success: true,
    data: user,
  })

});
