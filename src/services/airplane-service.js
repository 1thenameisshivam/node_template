const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../errors");
const { airplaneRepository } = require("../repositories");

const airplaneRepo = new airplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepo.create(data);
    return airplane;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      });
    }
    throw new AppError(
      "Cannot creat a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirplanes() {
  try {
    const airplanes = await airplaneRepo.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot retrieve airplane objects",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepo.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airplane you requested is not found",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot retrieve airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    await airplaneRepo.destroy(id);
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airplane you requested to delete is not found",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot delete airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id, data) {
  try {
    const airplane = await airplaneRepo.update(id, data);

    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airplane you requested to update is not found",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot update airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
