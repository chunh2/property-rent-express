const { Router } = require("express");
const addChatRoomValidate = require("../validations/chatRoom/addChatRoomValidate");
const authMiddleware = require("../middlewares/authMiddleware");
const validateReqMiddleware = require("../middlewares/utils/validateReqMiddleware");
const { addChatRoom } = require("../controllers/chatRoomController");

const router = new Router();

router.use(authMiddleware);

router.post(
  "/chat-rooms",
  addChatRoomValidate,
  validateReqMiddleware,
  addChatRoom
);

module.exports = router;
