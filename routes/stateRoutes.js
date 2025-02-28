const { Router } = require("express");
const { getStates } = require("../controllers/stateController");

const router = Router();

router.get("/states", getStates);

module.exports = router;
