const { StatusCodes } = require("http-status-codes");

const { ErrorResponse, AppError } = require("../errors");

function validateCreateRequest(req, res, next) {
  const { modelNumber, capacity } = req.body;
  if (!modelNumber || !capacity) {
    ErrorResponse.message = "Model number and capacity are required";
    ErrorResponse.error = new AppError(
      [
        {
          explanation: "Model number and capacity must be provided",
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
};
