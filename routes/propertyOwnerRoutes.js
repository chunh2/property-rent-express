const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { authOwnerMiddleware } = require("../middlewares/authMiddleware");
const { addProperty } = require("../controllers/propertyOwnerController");
const addPropertyValidate = require("../validations/propertyOwner/addPropertyValidate");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");

const router = Router();

router.use(authMiddleware, authOwnerMiddleware);

router.post(
  "/properties",
  addPropertyValidate,
  validateReqMiddleware,
  addProperty
);

module.exports = router;
