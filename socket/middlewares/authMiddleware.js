const { verifyToken } = require("../../utils/jwt");
const { User } = require("../../models");

const authMiddleware = async (socket, next) => {
  const token = socket.handshake?.auth?.token;

  console.log("Authentication error: No token provided");

  if (!token) {
    socket.emit("error", {
      message: "Authentication error: No token provided",
    });
  }

  try {
    const decoded = verifyToken(token);
    socket.user = decoded;

    const user = await User.findByPk(socket.user.user_id);

    if (!user) {
      socket.emit("error", {
        message: "Authentication error: User not found",
      });
    }

    next();
  } catch (e) {
    socket.emit("error", {
      message: "Authentication error: Invalid token",
    });
  }
};

module.exports = { authMiddleware };
