const { Router } = require("express");
const authRoutes = require("./authRoutes");
const propertyOwnerRouter = require("./propertyOwnerRoutes");
const stateRouter = require("./stateRoutes");
const propertyTypeRouter = require("./propertyTypeRoutes");
const propertyStatusRouter = require("./propertyStatusRoutes");

const router = Router();

router.use("/", authRoutes);
router.use("/owner/", propertyOwnerRouter);
router.use("/", stateRouter);
router.use("/", propertyTypeRouter);
router.use("/", propertyStatusRouter);

module.exports = router;
