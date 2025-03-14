const { checkSchema } = require("express-validator");

const getMessagesByUserIdsSchema = {
  user_id: {
    in: ["query"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "User ID is required",
    },

    toInt: true,
  },

  page: {
    in: ["query"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Page is required",
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

    toInt: true,
  },
};

module.exports = checkSchema(getMessagesByUserIdsSchema);
