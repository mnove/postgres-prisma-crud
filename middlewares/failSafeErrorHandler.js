// Failsafe error handler
function failSafeErrorHandler(error, req, res, next) {
  // generic error
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(error);
  }
  res.status(500).send("something went wrong.");
}

module.exports = failSafeErrorHandler;
