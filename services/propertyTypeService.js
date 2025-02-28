const { PropertyType } = require("../models");

const getPropertyTypesService = async () => {
  const propertyTypes = await PropertyType.findAll({
    attributes: ["id", "name"],
    order: [["id", "ASC"]],
  });

  if (propertyTypes?.length <= 0) {
    const error = new Error("Property types not found");
    error.statusCode = 404;
    throw error;
  }

  if (!propertyTypes) {
    const error = new Error("Failed to retrieve property types");
    error.statusCode = 500;
    throw error;
  }

  return propertyTypes;
};

module.exports = { getPropertyTypesService };
