const { State } = require("../models");

const getStateService = () => {
  const states = State.findAll({
    attributes: ["id", "name"],
  });

  if (states.length <= 0) {
    const error = new Error("States not found");
    error.statusCode = 404;
    throw error;
  }

  if (!states) {
    const error = new Error("Failed to retrieve states");
    error.statusCode = 500;
    throw error;
  }

  return states;
};

module.exports = { getStateService };
