const express = require("express");
const app = express();
const cors = require("cors");
var morgan = require("morgan");
const chalk = require("chalk");
const path = require("path");
const PORT = process.env.PORT || 5000;

// ROUTES
const organizationRoutes = require("./routes/organizationRoutes");
const userRoutes = require("./routes/userRoutes");

const apiErrorHandler = require("./middlewares/apiErrorHandler");
const dbErrorHandler = require("./middlewares/dbErrorHandler");
const failSafeErrorHandler = require("./middlewares/failSafeErrorHandler");
// const logger = require("./utils/logger");

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// json
app.use(express.json());

// LOGGER (only for development)
// info: https://www.npmjs.com/package/morgan
if (process.env.NODE_ENV === "development") {
  morgan.token("body", (req, res) => JSON.stringify(req.body));
  app.use(morgan("dev"));
  app.use(morgan(":res[content-length] :body - :req[content-length]")); // log the body and its length
}
// all the other logs are managed by Winston within the code

// ROUTES //
// Defining & Scoping ROUTES
app.use("/api/organization/", organizationRoutes);
app.use("/api/user/", userRoutes);

// ERROR HANDLING //
// only used if env is "development" to avoid leaking too much data...
if (process.env.NODE_ENV === "development") {
  app.use(dbErrorHandler); // Database / Prisma ORM error
}
app.use(apiErrorHandler); // Api errors
app.use(failSafeErrorHandler); // Failsafe error handler -
// last one to get called if all previous ones have "next()ed"

// Catch-all method
// (e.g. if we hit a route that does not exist)
app.all("*", (req, res) => {
  // res.status(404).send("Route not found");
  res.status(404).sendFile(path.join(__dirname, "html/404.html"));
});

// SERVER //
app.listen(PORT, () => {
  console.log(
    "\n",
    chalk.green.bold.underline(`Server has started on port ${PORT}`),
    "\n",
    `>>> env: ` + chalk.italic.bold(process.env.NODE_ENV),
    "\n"
  );
});
