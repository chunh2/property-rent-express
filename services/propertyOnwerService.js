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

const updatePropertyService = async (data, user_id) => {
  const { id } = data;

  // check if user exists
  const user = await User.findByPk(user_id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  //   check if property exists
  const property = await Property.findByPk(id);

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  //   check if user is the owner of the property
  if (property.user_id !== user.user_id) {
    const error = new Error(
      "Unauthorized. You are not the owner of the property"
    );
    error.statusCode = 403;
    throw error;
  }

  //   perform update
  const [numberOfUpdatedRow] = await Property.update(data, {
    where: {
      id,
    },
  });

  if (numberOfUpdatedRow !== 1) {
    const error = new Error("Internal server error");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  addPropertyService,
  getPropertiesService,
  updatePropertyService,
};
