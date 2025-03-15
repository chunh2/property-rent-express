const users = require("../users");

const connect = (socket, io) => {
  const key = socket.user.user_id;
  const value = socket.id;

  users.set(key, value);
  console.log(`${key}: ${value} connected`);

  socket.on("disconnect", () => {
    const key = socket.user.user_id;

    users.delete(key);

    console.log(`${key} disconnected`);
  });
};

module.exports = { connect };
