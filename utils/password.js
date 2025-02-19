const bcrypt = require("bcrypt");

const hashPassword = async (plainPassword) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

  return hashedPassword;
};

const checkPassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

  return isMatch;
};

module.exports = { hashPassword, checkPassword };
