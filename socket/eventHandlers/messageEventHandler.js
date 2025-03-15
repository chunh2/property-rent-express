const users = require("../users");
const { User } = require("../../models");
const { addMessageService } = require("../../services/messageService");

const sendMessage = (socket, io) => {
  socket.on(
    "sendMessage",
    async ({ senderId, chatRoomId, message_content }, callback) => {
      const data = { chat_room_id: chatRoomId, content: message_content };

      const { message, receivers } = await addMessageService(data, senderId);

      const receiversJSON = receivers.map((receiver) => receiver.toJSON());

      // send message to all receivers in chat room (currently, only have one receiver)
      receiversJSON.forEach((receiver) => {
        const receiverSocketId = users.get(receiver.user_id);

        console.log(receiver.id);
        console.log("User Socket", users);
        console.log("User Socket", receiverSocketId);

        // if receiver is not online, END
        if (!receiverSocketId) {
          return;
        }

        console.log("Message received at server");

        socket
          .to(receiverSocketId)
          .emit("receiveMessage", { chatRoomId, message });
      });

      callback({ success: true, message: "Message sent successfully" });
    }
  );
};

module.exports = { sendMessage };
