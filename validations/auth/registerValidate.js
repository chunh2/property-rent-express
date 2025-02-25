const { checkSchema } = require("express-validator");

const registerSchema = {
  name: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Name is required",
    },

    isLength: {
      options: { max: 30 },
      errorMessage: "Name cannot exceed 30 characters",
    },
  },

  email: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Email is required",
    },

    isString: {
      errorMessage: "Email must be a string",
    },

    isLength: {
      options: { max: 100 },
      errorMessage: "Email cannot exceed 100 characters",
    },

    isEmail: {
      errorMessage: "Invalid email format",
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

  confirmation_password: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Password confirmation is required",
    },

    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }

        return true;
      },
    },
  },

  role_ids: {
    in: ["body"],
    trim: true,
    escape: true,

    isArray: true,

    custom: {
      options: (value) => {
        if (value.length <= 0) {
          throw new Error("Role is required");
        }

        return true;
      },
    },

    customSanitizer: {
      options: (value) => {
        if (!Array.isArray(value)) return [];
        else {
          return value?.map((value) => parseInt(value));
        }
      },
    },
  },
};

module.exports = checkSchema(registerSchema);
