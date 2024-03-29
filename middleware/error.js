const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  const error = { ...err };
  error.message = err.message;

  if (error.name === "CastError") {
    error.message = "Энэ ID буруу бүтэцтэй ID байна!"
    res.statusCode = 400
  }

  if (error.name === "JsonWebTokenError" && error.message === "invalid signature") {
    error.message = "Буруу токен дамжуулсан байна"
    res.statusCode = 400
  }

  if (error.code === 11000) {
    error.message = "Талбарын утга давхардаж байна!"
    res.statusCode = 400
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error,
  });
};

module.exports = errorHandler;
