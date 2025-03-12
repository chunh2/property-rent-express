const { ChatMember, ChatRoom, Message } = require("../models");

const addMessageService = async (data, user_id) => {
  const { content, chat_room_id } = data;

  const chatRoom = await ChatRoom.findOne({
    where: {
      id: chat_room_id,
    },
    include: [
      {
        model: ChatMember,
        as: "chat_members",
        where: {
          user_id,
        },
      },
    ],
  });

  if (!chatRoom) {
    const error = new Error("Chat room not found");
    error.statusCode = 404;

    throw error;
  }

  const message = await Message.create({
    content,
    chat_room_id,
    sender_id: user_id,
  });

  if (!message) {
    const error = new Error("Server error");
    error.statusCode = 500;

    throw error;
  }

  return message;
};

module.exports = { addMessageService };
