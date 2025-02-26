const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { authOwnerMiddleware } = require("../middlewares/authMiddleware");
const {
  addProperty,
  getProperties,
  updateProperty,
} = require("../controllers/propertyOwnerController");
const addPropertyValidate = require("../validations/propertyOwner/addPropertyValidate");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");
const updatePropertyValidate = require("../validations/propertyOwner/updatePropertyValidate");

const router = Router();

router.use(authMiddleware, authOwnerMiddleware);

router.post(
  "/properties",
  addPropertyValidate,
  validateReqMiddleware,
  addProperty
);

router.get("/properties", getProperties);

router.patch(
  "/properties/:id",
  updatePropertyValidate,
  validateReqMiddleware,
  updateProperty
);

module.exports = router;
