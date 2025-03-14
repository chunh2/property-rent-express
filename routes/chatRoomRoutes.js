const { Router } = require("express");
const addChatRoomValidate = require("../validations/chatRoom/addChatRoomValidate");
const authMiddleware = require("../middlewares/authMiddleware");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");
const {
  addChatRoom,
  getChatRoomByUserId,
} = require("../controllers/chatRoomController");

const router = new Router();

router.use(authMiddleware);

router.post(
  "/chat-rooms",
  addChatRoomValidate,
  validateReqMiddleware,
  addChatRoom
);

router.get("/chat-rooms", getChatRoomByUserId);

module.exports = router;
