const { PrismaClient } = require("@prisma/client");
const ApiError = require("../errors/ApiError");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const getAll = async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        phone_number: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
