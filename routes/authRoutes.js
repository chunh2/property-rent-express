const { Router } = require("express");
const loginValidate = require("../validations/auth/loginValidate");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");
const {
  login,
  register,
  validateOwner,
  validateTenant,
  getRoles,
  updatePassword,
} = require("../controllers/authController");
const registerValidate = require("../validations/auth/registerValidate");
const authMiddleware = require("../middlewares/authMiddleware");
const updatePasswordValidate = require("../validations/auth/updatePasswordValidate");

const router = Router();

router.post("/login", loginValidate, validateReqMiddleware, login);

router.post("/register", registerValidate, validateReqMiddleware, register);

router.get("/auth/validate/owner", validateOwner);

router.get("/auth/validate/tenant", validateTenant);

router.get("/roles", getRoles);

router.patch(
  "/users/password",
  authMiddleware,
  updatePasswordValidate,
  validateReqMiddleware,
  updatePassword
);

module.exports = router;
