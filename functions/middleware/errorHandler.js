// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Initializing statusCode
  const statusCode = res.statusCode ? res.statusCode : 500;
  // Sending error response with the status code to the client
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
