const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const MyError = require("../utils/myError");

/** Protect function */
exports.protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new MyError("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү", 401);
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    throw new MyError("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү", 401);
  }

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = tokenObj.id
  req.userRole = tokenObj.role

  next();

});

/**
 * Authorize function
 * @param  {...any} roles roles
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      throw new MyError(`Таны эрх [${req.userRole}] нь энэ үйлдлийг хийхэд хүрэлцэхгүй байна`, 403);
    }

    next();
  }
}
