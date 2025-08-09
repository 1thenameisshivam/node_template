const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../errors");
const { airplaneRepository } = require("../repositories");

const airplaneRepo = new airplaneRepository();

function createAirplane(data) {
  try {
    const airplane = airplaneRepo.create(data);
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

function getAllAirplanes() {
  try {
    const airplanes = airplaneRepo.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot retrieve airplane objects",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirplane,
  getAllAirplanes,
};
