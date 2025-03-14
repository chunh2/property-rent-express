const { matchedData } = require("express-validator");
const {
  addChatRoomService,
  getChatRoomByUserIdService,
} = require("../services/chatRoomService");

const addChatRoom = async (req, res) => {
  const data = matchedData(req);

  const {
    decoded: { user_id: userId },
  } = req;

  try {
    const chatMembers = await addChatRoomService(data, userId);

    return res
      .status(200)
      .json({ message: "Chat room added successfully", data: chatMembers });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

const getChatRoomByUserId = async (req, res) => {
  const {
    decoded: { user_id: userId },
  } = req;

  try {
    const chatRooms = await getChatRoomByUserIdService(userId);

    return res
      .status(200)
      .json({ message: "Chat rooms retrieved successfully", data: chatRooms });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

module.exports = { addChatRoom, getChatRoomByUserId };
