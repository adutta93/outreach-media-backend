const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.statusCode(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
