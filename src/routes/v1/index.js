const express = require("express");

const { infoController } = require("../../controllers");
const cityRouter = require("./city-router");
const airplaneRouter = require("./airplane-router");
const router = express.Router();

router.get("/info", infoController.info);
router.use("/airplane", airplaneRouter);
router.use("/city", cityRouter);
module.exports = router;
