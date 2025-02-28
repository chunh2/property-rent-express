const { getStateService } = require("../services/stateService");

const getStates = async (req, res) => {
  try {
    const states = await getStateService();

    return res
      .status(200)
      .json({ message: "States retrieved successfully", data: states });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

module.exports = { getStates };
