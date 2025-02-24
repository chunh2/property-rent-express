const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
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

    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token", error: e.name });
  }
};

module.exports = authMiddleware;
