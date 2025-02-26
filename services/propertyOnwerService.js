const { Property } = require("../models");

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

module.exports = { addPropertyService };
