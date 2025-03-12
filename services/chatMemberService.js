const { ChatMember } = require("../models");

const addChatMemberService = async (chatRoomId, userId) => {
  const chatMember = await ChatMember.create({
    chat_room_id: chatRoomId,
    user_id: userId,
  });

  if (!chatMember) {
    const error = new Error("Server error");
    error.statusCode = 500;

    throw error;
  }

  return chatMember;
};

module.exports = { addChatMemberService };
