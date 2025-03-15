const { connect } = require("./connectEventHandler");
const { sendMessage } = require("./messageEventHandler");

const registerEventHandlers = (socket, io) => {
  connect(socket, io);
  sendMessage(socket, io);
};

module.exports = registerEventHandlers;
