const { checkSchema } = require("express-validator");

const getPropertiesSchema = {
  page: {
    in: ["query"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Page number is required",
    },

    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "Page number must be a positive integer",
    },

    toInt: true,
  },

  limit: {
    in: ["query"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Limit is required",
    },

    isInt: {
      options: { min: 1 },
      errorMessage: "Limit must be a positive integer",
    },

    toInt: true,
  },

  sortBy: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    isIn: {
      options: [["createdAt", "updatedAt", "price", "title"]],
      errorMessage:
        "Sort by should be either 'createdAt', 'updatedAt', 'price', or 'title'",
    },
  },

  sortOrder: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    isIn: {
      options: [["ASC", "DESC"]],
      errorMessage: "Sort order should be either 'ASC' or 'DESC'",
    },
  },

  property_status_id: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    isInt: {
      options: { min: 1, max: 4 },
      errorMessage: "State ID must be integer between 1 and 4",
    },

    toInt: true,
  },
};

module.exports = checkSchema(getPropertiesSchema);
