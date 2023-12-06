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
  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    data: user,
  })

});

/** User login */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 400);
  }

  const user = await User.findOne({
    email
  }).select('+password')

  if (!user) {
    throw new MyError("Имэйл болон нууц үг буруу байна", 401);
  }

  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    throw new MyError("Имэйл болон нууц үг буруу байна", 401);
  }

  res.status(200).json({
    success: true,
    token: user.getJsonWebToken(),
    user,
  })

});
