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

  state_id: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    notEmpty: {
      errorMessage: "State id is required",
    },

    isInt: {
      options: { min: 1 },
      errorMessage: "State ID must be a positive integer",
    },

    toInt: true,
  },

  property_type_id: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    notEmpty: {
      errorMessage: "Property type id is required",
    },

    isInt: {
      options: { min: 1 },
      errorMessage: "Property type ID must be a positive integer",
    },

    toInt: true,
  },

  min_price: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    notEmpty: {
      errorMessage: "Minimum price is required",
    },

    isFloat: {
      options: { min: 0 },
      errorMessage: "Minimum Ppice must be positive number",
    },

    toFloat: true,
  },

  max_price: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    isFloat: {
      options: { min: 0 },
      errorMessage: "Maximum price must be positive number",
    },

    custom: {
      options: (value, { req }) => {
        if (parseFloat(value) <= parseFloat(req.query.min_price)) {
          throw new Error("Maximum price must be greater than minimum price");
        }

        return true;
      },
    },

    toFloat: true,
  },

  search: {
    in: ["query"],
    trim: true,
    escape: true,
    optional: true,

    notEmpty: {
      errorMessage: "Enter keyword to search",
    },
  },
};

module.exports = checkSchema(getPropertiesSchema);
