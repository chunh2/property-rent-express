const { verifyToken } = require("../utils/jwt");
const dotenv = require("dotenv");
const { Role } = require("../models");

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

const authTenantMiddleware = async (req, res, next) => {
  const {
    decoded: { role_id },
  } = req;

  const role = await Role.findOne({
    where: {
      role_name: "tenant",
    },
  });

  const roleId = role.role_id;

  if (parseInt(roleId) === parseInt(role_id)) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Forbidden", message: "You do not have permission" });
  }
};

const authOwnerMiddleware = async (req, res, next) => {
  const {
    decoded: { role_id },
  } = req;

  const role = await Role.findOne({
    where: {
      role_name: "owner",
    },
  });

  const roleId = role.role_id;

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
