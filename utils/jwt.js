const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
  const roles = user.Roles;

  const roleIds = roles.map((role) => role.role_id);

  const payload = {
    user_id: user.user_id,
    email: user.email,
    roles: roleIds,
  };

  const options = {
    expiresIn: "1m",
  };

  const token = jwt.sign(payload, jwtSecret, options);

  return token;
};

module.exports = { generateAccessToken };
