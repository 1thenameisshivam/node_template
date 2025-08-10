const { cityRepository } = require("../repositories");
const { AppError } = require("../errors");
async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      });
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "Cannot retrieve city objects",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCityById(id) {
  try {
    const city = await cityRepository.getById(id);
    return city;
  } catch (error) {
    throw new AppError(
      "Cannot retrieve city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      });
    }
    throw new AppError(
      "Cannot update city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    await cityRepository.delete(id);
  } catch (error) {
    throw new AppError(
      "Cannot delete city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
