const { Router } = require("express");
const authRoutes = require("./authRoutes");
const propertyOwnerRouter = require("./propertyOwnerRoutes");

const router = Router();

router.use("/", authRoutes);
router.use("/", propertyOwnerRouter);

module.exports = router;
