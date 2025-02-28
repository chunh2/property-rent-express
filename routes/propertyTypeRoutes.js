const { Router } = require("express");
const { getPropertyTypes } = require("../controllers/propertyTypeController");

const router = Router();

router.get("/property-types", getPropertyTypes);

module.exports = router;
