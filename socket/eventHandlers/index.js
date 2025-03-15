const { connect } = require("./connectEventHandler");

const registerEventHandlers = (socket, io) => {
  connect(socket, io);
};

module.exports = registerEventHandlers;
