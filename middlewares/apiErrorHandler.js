const ApiError = require("../errors/ApiError");
const chalk = require("chalk");
const logger = require("../utils/logger");

function apiErrorHandler(err, req, res, next) {
  // only in development, use a custom logging for readibility purposes
  if (process.env.NODE_ENV === "development") {
    console.log(
      "\n",
      chalk.blackBright.bgWhiteBright.italic(
        " -------------------------------- "
      ),
      "\n",
      "\n",
      chalk.white.bgRed.bold(" API ERROR ") +
        chalk.red.cyan(" - Expressjs Api - "),
      "\n",
      "\n",
      chalk.whiteBright("Cause: ") + chalk.red.italic.bold(err.message), // log error's message
      "\n",
      "\n",
      chalk.whiteBright("Code: ") +
        chalk.black.bgYellowBright.bold(` ${err.code ? err.code : 500} `), // if no error is defined, return generic error code
      "\n",
      "\n",
      chalk.blackBright.bgWhiteBright.italic(
        " -------------------------------- "
      ),
      "\n",
      "\n",
      err, // log the full Api error
      "\n",
      "\n"
    );
  }

  // Winston logging
  logger.error(err);

  // check if the error is part of our ApiError class
  if (err instanceof ApiError) {
    res.status(err.code).send(err);
    return;
  }

  // if not, return a generic error
  res.status(500).json({
    code: 500,
    msg: "Something went wrong",
  });
}

module.exports = apiErrorHandler;
