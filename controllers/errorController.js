const sendProdError = function (err, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(err.statusCode).json({
    message: "Something went wrong!",
  });
};

const sendDevErr = function (err, req, res) {
  if (req.originalUrl.startsWith("/api"))
    return res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack,
      error: err,
    });

  console.log(`${err} 💥💥`);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendDevErr(err, req, res);
  next();
};
