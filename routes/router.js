const { Router } = require("express");
const authRoutes = require("./authRoutes");
const propertyOwnerRouter = require("./propertyOwnerRoutes");
const stateRouter = require("./stateRoutes");

const router = Router();

router.use("/", authRoutes);
router.use("/owner/", propertyOwnerRouter);
router.use("/", stateRouter);

module.exports = router;
