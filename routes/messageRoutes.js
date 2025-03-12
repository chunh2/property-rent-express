const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const addMessageValidate = require("../validations/message/addMessageValidate");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");
const {
  addMessage,
  getMessagesByChatRoomId,
} = require("../controllers/messageController");

const router = Router();

router.use(authMiddleware);

router.post("/messages", addMessageValidate, validateReqMiddleware, addMessage);

router.get("/messages/:chatRoomId", getMessagesByChatRoomId);

module.exports = router;
