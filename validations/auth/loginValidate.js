const { checkSchema } = require("express-validator");

const loginSchema = {
  email: {
    in: ["body"],
    trim: true,
    escape: true,

    isString: {
      errorMessage: "Email must be a string",
    },

    notEmpty: {
      errorMessage: "Email is required",
    },

    isEmail: {
      errorMessage: "Invalid email format",
    },

    isLength: {
      options: { max: 100 },
      errorMessage: "Email cannot exceed 100 characters",
    },
  },

  password: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Password is required",
    },

    isLength: {
      options: { min: 8 },
      errorMessage: "At least 8 characters",
    },
  },
};

module.exports = checkSchema(loginSchema);
