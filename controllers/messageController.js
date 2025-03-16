const { matchedData } = require("express-validator");
const {
  addMessageService,
  getMessagesByChatRoomIdService,
  getMessagesByUserIdsService,
} = require("../services/messageService");

const addMessage = async (req, res) => {
  const data = matchedData(req);
  const {
    decoded: { user_id },
  } = req;

  try {
    const { message, receivers } = await addMessageService(data, user_id);

    return res.status(201).json({
      message: "Message sent successfully",
      data: { message, receivers },
    });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

const getMessagesByUserIds = async (req, res) => {
  const data = matchedData(req);

  const {
    decoded: { user_id: userId },
  } = req;

  try {
    const messages = await getMessagesByUserIdsService(data, userId);

    return res
      .status(200)
      .json({ message: "Messages retrieved successfully", data: messages });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

const getMessagesByChatRoomId = async (req, res) => {
  const {
    params: { chatRoomId },
  } = req;

  const {
    decoded: { user_id },
  } = req;

  try {
    const messages = await getMessagesByChatRoomIdService(chatRoomId, user_id);

    return res
      .status(200)
      .json({ message: "Messages retrieved successfully", data: messages });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

module.exports = { addMessage, getMessagesByUserIds, getMessagesByChatRoomId };
