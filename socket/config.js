const { Server } = require("socket.io");
const registerEventHandlers = require("./eventHandlers");
const { authMiddleware } = require("./middlewares/authMiddleware");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.ALLOW_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  //   Middleware
  io.use(authMiddleware);

  io.on("connection", (socket) => {
    registerEventHandlers(socket, io);
  });

  return io;
};

module.exports = setupSocket;
