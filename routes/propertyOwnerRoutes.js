const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { authOwnerMiddleware } = require("../middlewares/authMiddleware");
const {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  getProperty,
} = require("../controllers/propertyOwnerController");
const addPropertyValidate = require("../validations/propertyOwner/addPropertyValidate");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");
const updatePropertyValidate = require("../validations/propertyOwner/updatePropertyValidate");
const getPropertiesValidate = require("../validations/propertyOwner/getPropertiesValidate");
const {
  uploadPropertyImagesMiddleware,
} = require("../middlewares/uploadPropertyImagesMiddleware");
const {
  validatePropertyImagesMiddleware,
} = require("../middlewares/validatePropertyImagesMiddleware");
const checkCountPropertyImagesMiddleware = require("../middlewares/checkCountPropertyImagesMiddleware");

const router = Router();

router.use(authMiddleware, authOwnerMiddleware);

router.post(
  "/properties",
  uploadPropertyImagesMiddleware, //multer middleware
  validatePropertyImagesMiddleware, //custom middleware
  addPropertyValidate,
  validateReqMiddleware,
  addProperty
);

router.get(
  "/properties",
  getPropertiesValidate,
  validateReqMiddleware,
  getProperties
);

router.get("/properties/:id", getProperty);

router.patch(
  "/properties/:id",
  uploadPropertyImagesMiddleware, //multer middleware
  updatePropertyValidate,
  validateReqMiddleware,
  checkCountPropertyImagesMiddleware,
  updateProperty
);

router.delete("/properties/:id", deleteProperty);

module.exports = router;
