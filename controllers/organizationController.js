const { PrismaClient } = require("@prisma/client");
const ApiError = require("../errors/ApiError");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const { organization } = prisma;

const getAll = async (req, res, next) => {
  try {
    const allOrganizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        planId: true,
      },
    });

    return res.status(200).json(allOrganizations);
  } catch (error) {
    next(error);
  }
};

const getOneOrganization = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    console.log(organizationId);
    console.log(req.params);
    // check if values are present in the body
    if (Object.keys(req.params).length < 1) {
      // return error
      next(
        ApiError.badRequest("Organization ID not found in the request param")
      );
    }

    // check if organization ID exists in the DB
    const doesOrgExists = await organization.findUnique({
      where: {
        id: organizationId,
      },
    });
    if (!doesOrgExists) {
      // return error
      next(ApiError.notFound("Organization does not exists."));
    }
    // get organization
    const existingOrganization = await organization.findUnique({
      where: {
        // get the correct organization to update
        id: organizationId,
      },
      select: {
        // selected organization data
        name: true,
        slug: true,
        planId: true,
      },
    });
    return res.status(200).json(existingOrganization);
  } catch (error) {
    next(error);
  }
};

const createOrganization = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const doesOrgAlreadyExists = await organization.findUnique({
      where: {
        name: name,
      },
    });

    if (doesOrgAlreadyExists) {
      // return DB error
      next(ApiError.badRequest("Organization already exists"));
    } else {
      // create a new organization
      const newOrganization = await organization.create({
        data: {
          name,
          slug,
        },
      });

      return res.status(201).json(newOrganization);
    }
  } catch (error) {
    next(error);
  }
};

const updateOrganization = async (req, res, next) => {
  try {
    const { id, name, slug, planId } = req.body;
    let planIdInt = parseInt(planId);
    console.log("planID", planId);
    // check if values are present in the body
    if (!id || name.length < 1 || slug.length < 1 || planId.length < 1) {
      // return error
      next(
        ApiError.badRequest(
          "Error in one or more of the elements of the request body."
        )
      );
    }

    // check if organization ID exists in the DB
    const doesOrgExists = await organization.findUnique({
      where: {
        id: id,
      },
    });
    if (!doesOrgExists) {
      // return error
      next(ApiError.notFound("Organization does not exists."));
    }
    // update organization
    const updatedOrganization = await organization.update({
      where: {
        // get the correct organization to update
        id: id,
      },
      data: {
        // data for update
        name: name,
        slug: slug,
        planId: planIdInt,
      },
    });
    return res.status(200).json(updatedOrganization);
  } catch (error) {
    next(error);
  }
};

const deleteOrganizationNoParam = async (req, res, next) => {
  try {
    if (Object.keys(req.params).length < 1) {
      next(
        ApiError.badRequest("Organization ID param not present in the request.")
      );
      return;
    }
  } catch (error) {
    next(error);
  }
};

const deleteOrganization = async (req, res, next) => {
  try {
    const { organizationId } = req.params;

    // check if organization ID param is provided
    if (!organizationId) {
      next(
        ApiError.badRequest("Organization ID param not present in the request.")
      );
    }

    // check if organization ID exists in the DB
    const doesOrgExists = await organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!doesOrgExists) {
      next(ApiError.notFound("Organization does not exists."));
    }

    // delete the organization by ID
    const deletedOrganization = await prisma.organization.delete({
      where: {
        id: organizationId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return res.status(200).json(deletedOrganization);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOneOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganizationNoParam,
  deleteOrganization,
};
