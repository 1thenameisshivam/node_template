const { StatusCodes } = require("http-status-codes");

const { ErrorResponse, AppError } = require("../errors");

function validateCreateRequest(req, res, next) {
  const { name } = req.body;
  if (!name) {
    ErrorResponse.message = "City is required to create";
    ErrorResponse.error = new AppError(
      [
        {
          explanation: "City name must be provided",
        },
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body?.name) {
    ErrorResponse.message = "At least one field (city) must be provided";
    ErrorResponse.error = new AppError(
      [
        {
          explanation: "City name  must be provided for update",
        },
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
