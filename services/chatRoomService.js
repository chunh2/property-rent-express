const { Op } = require("sequelize");
const { ChatRoom, ChatMember, User, sequelize } = require("../models");
const { addChatMemberService } = require("./chatMemberService");

const addChatRoomService = async (data, userId) => {
  const { user_id } = data;

  //   should not provide own ID
  if (parseInt(user_id) === parseInt(userId)) {
    const error = new Error("Cannot provide own ID");
    error.statusCode = 400;

    throw error;
  }

  const user = await User.findByPk(user_id);

  //   check if second user (others) exists
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;

    throw error;
  }

  //   get own chat_members
  const user1ChatMembers = await ChatMember.findAll({
    where: {
      user_id: userId,
    },
  });

  //   get chat_room_ids from chat_members
  const user1ChatRoomIds = user1ChatMembers.map(
    (chatMember) => chatMember.chat_room_id
  );

  //   for second user, check if already in the same chat room
  const existingChatMember = await ChatMember.findOne({
    where: {
      chat_room_id: {
        [Op.in]: user1ChatRoomIds,
      },
      user_id: user_id,
    },
  });

  //   if already in the same chat room, prevent creation
  if (existingChatMember) {
    // const error = new Error("Already created chat room between these users");
    // error.statusCode = 400;

    // throw error;

    const { chat_room_id } = existingChatMember;
    return { chatRoomId: chat_room_id };
  }

  const chatRoom = await ChatRoom.create();

  //   add both users into same chat room
  const chatMember1 = await addChatMemberService(chatRoom.id, userId);
  const chatMember2 = await addChatMemberService(chatRoom.id, user_id);

  const { chat_room_id } = chatMember1;

  return { chatRoomId: chat_room_id };
};

const getChatRoomByUserIdService = async (userId) => {
  const chatMembers = await ChatMember.findAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: ChatRoom,
        as: "chat_room",
        include: [
          {
            model: ChatMember,
            as: "chat_members",
            where: {
              user_id: {
                [Op.ne]: userId,
              },
            },
            include: [
              {
                model: User,
                as: "user",
              },
            ],
          },
        ],
      },
    ],
  });

  const chatRooms = chatMembers.map((chatMember) => chatMember.chat_room);

  return chatRooms;
};

module.exports = { addChatRoomService, getChatRoomByUserIdService };
