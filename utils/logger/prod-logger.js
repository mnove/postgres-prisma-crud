const { format, createLogger, transports } = require("winston");
const { timestamp, combine, errors, json } = format;

// only for production env.
function buildProdLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
    level: "http",
  });
}

module.exports = buildProdLogger;
