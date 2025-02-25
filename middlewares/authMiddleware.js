const { verifyToken } = require("../utils/jwt");
const dotenv = require("dotenv");

dotenv.config();

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
    req.decoded = decoded;

    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token", error: e.name });
  }
};

const authTenantMiddleware = (req, res, next) => {
  const {
    decoded: { role_id },
  } = req;

  const roleId = process.env.ROLE_ID_TENANT;

  if (parseInt(roleId) === parseInt(role_id)) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Forbidden", message: "You do not have permission" });
  }
};

const authOwnerMiddleware = (req, res, next) => {
  const {
    decoded: { role_id },
  } = req;

  const roleId = process.env.ROLE_ID_OWNER;

  if (parseInt(roleId) === parseInt(role_id)) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Forbidden", message: "You do not have permission" });
  }
};

module.exports = authMiddleware;
module.exports.authTenantMiddleware = authTenantMiddleware;
module.exports.authOwnerMiddleware = authOwnerMiddleware;
