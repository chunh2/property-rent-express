const { PropertyStatus } = require("../models");

const getPropertyStatusesService = async () => {
  const propertyStatuses = await PropertyStatus.findAll({
    attributes: ["id", "name"],
    order: [["id", "ASC"]],
  });

  if (!propertyStatuses) {
    const error = new Error("Failed to retrieve property statuses");
    error.statusCode = 500;
    throw error;
  }

  if (propertyStatuses.length <= 0) {
    const error = new Error("Property status not found");
    error.statusCode = 404;
    throw error;
  }

  return propertyStatuses;
};

module.exports = { getPropertyStatusesService };
