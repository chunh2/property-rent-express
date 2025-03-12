const { checkSchema } = require("express-validator");

const addMessageSchema = {
  content: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Message content is required",
    },
  },

  chat_room_id: {
    in: ["body"],
    trim: true,
    escape: true,

    notEmpty: {
      errorMessage: "Chat room ID is required",
    },

    isInt: {
      options: { min: 1 },
      errorMessage: "Chat room ID should be a positive integer",
    },

    toInt: true,
  },
};

module.exports = checkSchema(addMessageSchema);
