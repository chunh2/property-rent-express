const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const generateAccessToken = (user, expiresIn = "15m") => {
  const roles = user.Roles;

  const roleIds = roles.map((role) => role.role_id);

  const payload = {
    user_id: user.user_id,
    email: user.email,
    roles: roleIds,
  };

  const options = {
    expiresIn: `${expiresIn}`,
  };

  const token = jwt.sign(payload, jwtSecret, options);

  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, jwtSecret);

  return decoded;
};

module.exports = { generateAccessToken, verifyToken };
