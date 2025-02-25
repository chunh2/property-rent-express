const checkRole = (user, roleId) => {
  const roles = user.Roles;

  const isFound = roles.find((role) => role.role_id === parseInt(roleId));

  return isFound;
};

module.exports = { checkRole };
