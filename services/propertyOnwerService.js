const { Property, User } = require("../models");

const addPropertyService = async (data, decoded) => {
  const { user_id } = decoded;

  const property = await Property.create({ ...data, user_id });

  if (!property) {
    const error = new Error("Internal server error");
    error.statusCode = 500;
    return error;
  }

  return property;
};

const getPropertiesService = async (user_id) => {
  // check if user exists
  const user = await User.findByPk(user_id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return error;
  }

  //   search for properties
  const properties = await Property.findAll({
    where: {
      user_id,
    },
  });

  if (!properties.length) {
    const error = new Error("No properties found");
    error.statusCode = 404;
    return error;
  }

  return properties;
};

module.exports = { addPropertyService, getPropertiesService };
