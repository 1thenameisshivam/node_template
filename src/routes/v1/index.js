const express = require("express");

const { infoController } = require("../../controllers");
const airplaneRouter = require("./airplane-router");
const router = express.Router();

router.get("/info", infoController.info);
router.use("/airplane", airplaneRouter);

module.exports = router;
