const { PrismaClient } = require("@prisma/client");
const ApiError = require("../errors/ApiError");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const getAll = async (req, res, next) => {
  // try {
  //   const allOrganizations = await prisma.organization.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       slug: true,
  //     },
  //   });
  //   return res.status(200).json(allOrganizations);
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = {
  getAll,
};
