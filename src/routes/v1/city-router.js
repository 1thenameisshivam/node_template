const express = require("express");
const { cityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");
const router = express.Router();

router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  cityController.createCity
);
router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCityById);
router.put(
  "/:id",
  CityMiddleware.validateUpdateRequest,
  cityController.updateCity
);
router.delete("/:id", cityController.deleteCity);

module.exports = router;
