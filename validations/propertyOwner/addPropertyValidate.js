const { checkSchema } = require("express-validator");

const addPropertySchema = {
  title: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Title is required",
    },

    isString: {
      errorMessage: "Title must be a string",
    },

    isLength: {
      options: { max: 255 },
      errorMessage: "Title cannot exceed 255 characters",
    },
  },

  description: {
    in: ["body"],
    trim: true,
    escape: true,
  },

  price: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Price is required",
    },

    isDecimal: {
      options: { decimal_digits: "0,2" },
      errorMessage: "Invalid price format",
    },

    isFloat: {
      options: { min: 0, max: 99999999.99 },
      errorMessage: "Price cannot exceed 9999 9999.99",
    },
  },

  address: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Address is required",
    },

    isLength: {
      options: { max: 255 },
      errorMessage: "Address cannot exceed 255 characters",
    },
  },

  city: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "City is required",
    },

    isLength: {
      options: { max: 255 },
      errorMessage: "City cannot exceed 255 characters",
    },
  },

  bedroom: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Number of bedrooms is required",
    },

    isInt: {
      options: { min: 0 },
      errorMessage: "Number of bedrooms cannot less than 0",
    },
  },

  bathroom: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Number of bathrooms is required",
    },

    isInt: {
      options: { min: 0 },
      errorMessage: "Number of bathrooms cannot less than 0",
    },
  },

  property_type_id: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Property type is required",
    },

    isInt: {
      options: { min: 1 },
      errorMessage: "Invalid property type",
    },
  },

  state_id: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "State is required",
    },

    isInt: {
      options: { min: 1 },
      errorMessage: "Invalid state",
    },
  },
};

module.exports = checkSchema(addPropertySchema);
