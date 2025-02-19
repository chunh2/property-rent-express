const { matchedData } = require("express-validator");
const { loginService, registerService } = require("../services/authService");

const login = async (req, res, next) => {
  const data = matchedData(req);

  try {
    const token = await loginService(data);

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
