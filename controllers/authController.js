const { matchedData } = require("express-validator");
const { loginService, registerService } = require("../services/authService");
const { verifyToken } = require("../utils/jwt");

const login = async (req, res, next) => {
  const data = matchedData(req);

  try {
    const token = await loginService(data);

    const { exp } = verifyToken(token);
    const expireAt = new Date(exp * 1000);

    // set timezone for cookie expire (UTC+8)
    expireAt.setHours(expireAt.getHours() + 8);

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "Lax",
      expires: expireAt,
    });

    return res.status(200).json(token);
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

module.exports = { login, register };
