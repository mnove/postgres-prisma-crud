const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const userController = require("../controllers/userContoller");
// organization routes
// routes are scoped to "api/organization/" in app.js

router.get("/", userController.getAll); // Get all users from the DB
router.get("/:userId", userController.getOne); // Get one user from the DB
router.post("/", userController.createUser); // Create a new user
router.put("/", userController.updateUser); //
router.delete("/:userId", userController.deleteUser); //
// router.post("/", userController.createUser); // Create a new organization
// router.delete("/", userController.deleteUserNoParam);
// router.delete("/:organizationId", userController.deleteUser); // Delete a user
module.exports = router;
