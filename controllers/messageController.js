const { matchedData } = require("express-validator");
const { addMessageService } = require("../services/messageService");

const addMessage = async (req, res) => {
  const data = matchedData(req);
  const {
    decoded: { user_id },
  } = req;

  try {
    const message = await addMessageService(data, user_id);

    return res
      .status(201)
      .json({ message: "Message sent successfully", data: message });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

module.exports = { addMessage };
