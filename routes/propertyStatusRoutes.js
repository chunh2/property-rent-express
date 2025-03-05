const { Router } = require("express");
const {
  getPropertyStatuses,
} = require("../controllers/propertyStatusController");

const router = Router();

router.get("/property-statuses", getPropertyStatuses);

module.exports = router;
