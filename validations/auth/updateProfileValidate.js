const { checkSchema } = require("express-validator");

const updateProfileSchema = {
  name: {
    in: ["body"],
    trim: true,
    escape: true,
    optional: true,

    notEmpty: {
      errorMessage: "Name is required",
    },

    isLength: {
      options: { max: 30 },
      errorMessage: "Name cannot exceed 30 characters",
    },
  },

  phone: {
    in: ["body"],
    trim: true,
    escape: true,

    customSanitizer: {
      options: (value) =>
        value === "" || value === null ? null : value.replace(/\D/g, ""),
    },

    isLength: {
      options: { max: 20 },
      errorMessage: "Phone number cannot exceed 20 characters",
    },

    optional: {
      nullable: true,
    },
  },
};

module.exports = checkSchema(updateProfileSchema);
