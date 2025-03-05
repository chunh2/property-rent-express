const { User, Role, UserRole } = require("../models");
const { checkPassword } = require("../utils/password");
const { generateAccessToken } = require("../utils/jwt");
const { checkRole } = require("../utils/checkRole");

const loginService = async (data) => {
  const { email, password, roleId } = data;

  //   Check whether user exist
  const user = await User.scope("withPassword").findOne({
    where: {
      email: email,
    },
    include: [
      {
        model: Role,
      },
    ],
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  //   check password
  const isMatch = await checkPassword(password, user.password);

  if (!isMatch) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // check role
  const isRoleFound = checkRole(user, roleId);

  if (!isRoleFound) {
    const error = new Error("Invalid role");
    error.statusCode = 400;
    throw error;
  }

  const token = generateAccessToken(user, roleId);

  return { token, roleId };
};

const registerService = async (data) => {
  const { name, email, password, role_ids } = data;

  //   Check email is already in use
  const existingUser = await User.findOne({
    where: { email: email },
  });

  if (existingUser) {
    const error = new Error("Email is already in use");
    error.statusCode = 400;
    throw error;
  }

  //   Check role exist

  const roles = await Role.findAll({ attributes: ["role_id"] });
  const rolesIdsFromDb = roles.map((role) => role.role_id);

  const allRolesExist = role_ids.every((role_id) =>
    rolesIdsFromDb.includes(role_id)
  );

  if (!allRolesExist) {
    console.log("Role does not exist");
    const error = new Error("Role does not exist");
    error.statusCode = 400;
    throw error;
  }

  //   Create new user
  const user = await User.create({ name, email, password });

  //   create user_role
  if (role_ids.length === 1) {
    // if 1 role
    await UserRole.create({
      user_id: user.user_id,
      role_id: role_ids[0],
    });
  } else if (role_ids.length > 1) {
    // if more than one role
    const userRoles = role_ids.map((role_id) => {
      return { user_id: user.user_id, role_id: role_id };
    });

    await UserRole.bulkCreate(userRoles);
  }

  return user;
};

const getRolesService = async () => {
  const roles = Role.findAll({
    attributes: ["role_id", "role_name"],
    order: [["role_id", "ASC"]],
  });

  if (!roles) {
    const error = new Error("Failed to retrieve roles");
    error.statusCode = 500;
    throw error;
  }

  if (roles.length <= 0) {
    const error = new Error("Roles not found");
    error.statusCode = 404;
    throw error;
  }

  return roles;
};

module.exports = { loginService, registerService, getRolesService };
