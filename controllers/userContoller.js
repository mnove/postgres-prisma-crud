const { PrismaClient } = require("@prisma/client");
const ApiError = require("../errors/ApiError");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});
const bcrypt = require("bcrypt");

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

const getOne = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // check if the id is present in the params
    if (Object.keys(req.params).length < 1) {
      // return error
      next(
        ApiError.badRequest("Organization ID not found in the request param")
      );
    }

    // find the user
    const uniqueUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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
    console.log(uniqueUser);
    if (!uniqueUser) {
      // return error if uniqueUser does not exist
      next(ApiError.notFound("User does not exist."));
    } else {
      return res.status(200).json(uniqueUser);
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;
    const doesUserAlreadyExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (doesUserAlreadyExist) {
      next(ApiError.notFound("User already exists."));
    } else {
      // create a new user
      const salt = await bcrypt.genSalt(10); // generate salt for password
      const hashedPassword = await bcrypt.hash(password, salt); // hashing the password
      const newUser = await prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword, // using hashed password
          phone_number: phone_number,
        },
      });

      return res.status(201).json(newUser);
    }
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { id, first_name, last_name, email, password, phone_number } =
      req.body;

    // check any of the value is not present in the params
    if (
      !id ||
      first_name.length < 1 ||
      last_name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      phone_number.length < 1
    ) {
      // return error
      next(
        ApiError.badRequest(
          "Error in one or more of the elements of the request body."
        )
      );
    }

    // check if user ID exists in the DB
    const doesUserExist = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!doesUserExist) {
      // return error
      next(ApiError.notFound("User does not exists."));
    } else {
      // update user

      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          // data for update
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          phone_number: phone_number,
        },
      });
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // check if ID param is provided
    if (!userId) {
      next(ApiError.badRequest("User ID param not present in the request."));
    }

    // check if organization ID exists in the DB
    const doesUserExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!doesUserExists) {
      next(ApiError.notFound("User does not exist."));
    }

    // delete the user by ID
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    return res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  deleteUser,
};
