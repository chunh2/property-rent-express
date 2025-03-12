const { Router } = require("express");
const authRoutes = require("./authRoutes");
const propertyOwnerRouter = require("./propertyOwnerRoutes");
const stateRouter = require("./stateRoutes");
const propertyTypeRouter = require("./propertyTypeRoutes");
const propertyStatusRouter = require("./propertyStatusRoutes");
const propertyTenantRouter = require("./propertyTenantRoutes");
const chatRoomRouter = require("./chatRoomRoutes");
const messageRouter = require("./messageRoutes");

const router = Router();

router.use("/", authRoutes);
router.use("/owner/", propertyOwnerRouter);
router.use("/tenant/", propertyTenantRouter);
router.use("/", stateRouter);
router.use("/", propertyTypeRouter);
router.use("/", propertyStatusRouter);
router.use("/", chatRoomRouter);
router.use("/", messageRouter);

module.exports = router;
