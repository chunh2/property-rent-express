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

const getMessagesByChatRoomIdService = async (chatRoomId, user_id) => {
  const chatRoom = await ChatRoom.findAll({
    where: {
      id: chatRoomId,
    },
    include: [
      {
        model: Message,
        as: "messages",
      },
      {
        model: ChatMember,
        as: "chat_members",
      },
    ],
  });

  //   if check room not found
  if (chatRoom.length <= 0) {
    const error = new Error("Chat room not found");
    error.statusCode = 404;

    throw error;
  }

  const [{ chat_members, messages }] = chatRoom;

  //   check if the user is member of chat room
  const isMember = chat_members.find(
    (chatMember) => chatMember.user_id === parseInt(user_id)
  );

  if (!isMember) {
    const error = new Error("You do not have permission");
    error.statusCode = 403;

    throw error;
  }

  if (messages?.length <= 0) {
    const error = new Error("Messages not found");
    error.statusCode = 404;

    throw error;
  }

  return messages;
};

module.exports = { addMessageService, getMessagesByChatRoomIdService };
