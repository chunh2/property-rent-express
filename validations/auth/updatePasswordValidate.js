const { checkSchema } = require("express-validator");

const updatePasswordSchema = {
  oldPassword: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Old password is required",
    },
  },

  newPassword: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "New password is required",
    },

    isLength: {
      options: { min: 8 },
      errorMessage: "At least 8 characters",
    },
  },

  confirmNewPassword: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "New password confirmation is required",
    },

    custom: {
      options: (value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("New passwords do not match");
        }

        return true;
      },
    },
  },
};

module.exports = checkSchema(updatePasswordSchema);
