const { matchedData } = require("express-validator");
const { loginService, registerService } = require("../services/authService");
const { verifyToken } = require("../utils/jwt");

const login = async (req, res, next) => {
  const data = matchedData(req);

  try {
    const { token, roleId } = await loginService(data);

    const { exp } = verifyToken(token);
    const expireAt = new Date(exp * 1000);

    // set timezone for cookie expire (UTC+8)
    expireAt.setHours(expireAt.getHours() + 8);

    res.cookie("accessToken", token, {
      httpOnly: false,
      sameSite: "Lax",
      expires: expireAt,
    });

    return res.status(200).json({ token, roleId });
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

const validate = (req, res) => {
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

    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "Authorized" });
  } catch (e) {
    return res.status(401).json({ message: "Invalid token", error: e.name });
  }
};

module.exports = { login, register, validate };
