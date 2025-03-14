const { ChatMember, ChatRoom, Message, User } = require("../models");
const { Op } = require("sequelize");
const { addChatRoomService } = require("./chatRoomService");

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

const getMessagesByUserIdsService = async (data, userId) => {
  const { user_id, page = 1, limit = 10 } = data;

  if (userId === user_id) {
    const error = new Error("Duplicate user ID");
    error.statusCode = 400;

    throw error;
  }

  const user1chatMembers = await ChatMember.findAll({
    where: {
      user_id: userId,
    },
  });

  // extract chat_room_id
  const chatRoomIds = user1chatMembers.map(
    (chatMember) => chatMember.chat_room_id
  );

  const user2chatMembers = await ChatMember.findAll({
    where: {
      user_id: user_id,
    },
  });

  const matchedChatMember = user2chatMembers.find((chatMember) =>
    chatRoomIds.includes(chatMember.chat_room_id)
  );

  // create new chat room, if not exist
  if (!matchedChatMember) {
    await addChatRoomService(data, userId);

    return [];
  }

  const chatRoomId = matchedChatMember.chat_room_id;

  // getting messages

  const offset = (page - 1) * limit;

  const whereConditions = {
    chat_room_id: chatRoomId,
  };

  const messages = await Message.findAll({
    where: whereConditions,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return messages;
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
        include: [
          {
            model: User,
            as: "sender",
          },
        ],
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

module.exports = {
  addMessageService,
  getMessagesByUserIdsService,
  getMessagesByChatRoomIdService,
};
