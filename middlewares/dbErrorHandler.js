const chalk = require("chalk");
const { Prisma } = require("@prisma/client");

// Handling DATABASE / PRISMA errors only
function dbErrorHandler(err, req, res, next) {
  // check if error is a Prisma client error

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("I AM A KNOWS ERORR FROM PRISMA");
    console.log(
      "\n",
      chalk.blackBright.bgWhiteBright.italic(
        " -------------------------------- "
      ),
      "\n",
      "\n",
      chalk.white.bgRed.bold(" DATABASE ERROR ") +
        chalk.cyan.bold(" - Prisma - "),
      "\n",
      "\n",
      chalk.white("Message: ") + chalk.red.italic.bold(err.message), // log error's message
      "\n",
      "\n",
      chalk.white("Code: ") + chalk.black.bgYellowBright.bold(` ${err.code} `), // log error's code
      "\n",
      "\n",
      chalk.blackBright.bgWhiteBright.italic(
        " -------------------------------- "
      ),
      "\n",
      "\n",
      err, // log the full Prisma error
      "\n",
      "\n"
    );
    return res.status(500).send(err); // returning the full Prisma error
  } else {
    next(err); // proceed to next middleware
  }
}

module.exports = dbErrorHandler;
