const { Router } = require("express");
const { getProperties } = require("../controllers/propertyTenantController");
const getPropertiesValidate = require("../validations/propertyTenant/getPropertiesValidate");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");

const router = new Router();

router.get(
  "/properties",
  getPropertiesValidate,
  validateReqMiddleware,
  getProperties
);

module.exports = router;
