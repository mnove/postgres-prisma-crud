const logger = require("../utils/logger");
// Failsafe error handler
function failSafeErrorHandler(error, req, res, next) {
  // generic error
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(error); // send specific error message in prod
    logger.error(error);
  }
  logger.error(error); // winston error logging
  res.status(500).send("something went wrong."); // send generic error message in prod
}

module.exports = failSafeErrorHandler;
