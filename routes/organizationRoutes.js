const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const organizationController = require("../controllers/organizationController");

// organization routes
// routes are scoped to "api/organization/" in app.js

router.get("/", organizationController.getAll); // Get all organization from the DB
router.get("/:organizationId", organizationController.getOneOrganization); // Get one organization by ID
router.post("/", organizationController.createOrganization); // Create a new organization
router.put("/", organizationController.updateOrganization); // Update a new organization
router.delete("/", organizationController.deleteOrganizationNoParam);
router.delete("/:organizationId", organizationController.deleteOrganization);
module.exports = router;
