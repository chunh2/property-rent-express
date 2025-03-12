const { checkSchema } = require("express-validator");

const addChatRoomSchema = {
  user_id: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "User ID is required",
    },

    isInt: {
      options: { min: 1 },
      errorMessage: "User ID should be a positive integer",
    },

    toInt: true,
  },

  name: {
    in: ["body"],
    trim: true,
    escape: true,
    optional: true,

    notEmpty: {
      errorMessage: "Name is required",
    },
  },
};

module.exports = checkSchema(addChatRoomSchema);
