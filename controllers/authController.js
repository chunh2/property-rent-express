const { matchedData } = require("express-validator");
const {
  loginService,
  registerService,
  getRolesService,
} = require("../services/authService");
const { verifyToken } = require("../utils/jwt");

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
    return res.status(e.statusCode).json({ error: e.message });
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
    return res.status(e.statusCode).json({ error: e.message });
  }
};

const validateOwner = (req, res) => {
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

    const roleId = process.env.ROLE_ID_OWNER;

    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // role not match
    if (role_id !== roleId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "Authorized" });
  } catch (e) {
    return res.status(401).json({ message: "Invalid token", error: e.name });
  }
};

const validateTenant = (req, res) => {
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

    const roleId = process.env.ROLE_ID_TENANT;

    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // role not match
    if (role_id !== roleId) {
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
    return res.status(e.statusCode).json({ error: e.message });
  }
};

module.exports = { login, register, validateOwner, validateTenant, getRoles };
