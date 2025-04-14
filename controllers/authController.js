const { matchedData } = require("express-validator");
const {
  loginService,
  registerService,
  getRolesService,
  updatePasswordService,
  updateProfileService,
} = require("../services/authService");
const { verifyToken } = require("../utils/jwt");
const { Role } = require("../models");

const login = async (req, res, next) => {
  const data = matchedData(req);

  try {
    const { token, roleId, user } = await loginService(data);

    const { exp } = verifyToken(token);
    const expireAt = new Date(exp * 1000);

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "Lax",
      expires: expireAt,
    });

    return res.status(200).json({ token, roleId, user });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

const register = async (req, res, next) => {
  const data = matchedData(req);

  try {
    const user = await registerService(data);

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

const validateOwner = async (req, res) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  // if no token found
  if (!token) {
    return res
      .status(401)
      .json({ error: "Missing token", message: "Token is required" });
  }

  // if token found
  try {
    const decoded = verifyToken(token);

    const { role_id } = decoded;

    const role = await Role.findOne({
      where: {
        role_name: "owner",
      },
    });

    const roleId = role.role_id;

    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // role not match
    if (Number(role_id) !== Number(roleId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "Authorized" });
  } catch (e) {
    return res.status(401).json({ message: "Invalid token", error: e.name });
  }
};

const validateTenant = async (req, res) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  // if no token found
  if (!token) {
    return res
      .status(401)
      .json({ error: "Missing token", message: "Token is required" });
  }

  // if token found
  try {
    const decoded = verifyToken(token);

    const { role_id } = decoded;

    const role = await Role.findOne({
      where: {
        role_name: "tenant",
      },
    });

    const roleId = role.role_id;

    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // role not match
    if (Number(role_id) !== Number(roleId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "Authorized" });
  } catch (e) {
    return res.status(401).json({ message: "Invalid token", error: e.name });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await getRolesService();

    return res
      .status(200)
      .json({ message: "Roles retrieved successfully", data: roles });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

const updatePassword = async (req, res) => {
  const data = matchedData(req);

  const {
    decoded: { user_id: userId },
  } = req;

  try {
    await updatePasswordService(data, userId);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

const updateProfile = async (req, res) => {
  const data = matchedData(req);

  const {
    decoded: { user_id: userId },
  } = req;

  try {
    await updateProfileService(data, userId);

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

module.exports = {
  login,
  register,
  validateOwner,
  validateTenant,
  getRoles,
  updatePassword,
  updateProfile,
};
