const buildDevLogger = require("./dev-logger");
const buildProdLogger = require("./prod-logger");

// defining logging service to use,
// depending on development or prod env.
let logger = null;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

module.exports = logger;
