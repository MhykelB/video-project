const errorHandler = (err, req, res, next) => {
  const customError = {
    message: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };

  if (err.name == "CastError") {
    customError.statusCode = 400;
    customError.message = `Argument passed  of user _id ${
      err.value || " "
    } is of the wrong format `;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandler;
