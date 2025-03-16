const {
  getPropertyStatusesService,
} = require("../services/propertyStatusService");

const getPropertyStatuses = async (req, res) => {
  try {
    const propertyStatuses = await getPropertyStatusesService();

    return res.status(200).json({
      message: "Property statuses retrieved successfully",
      data: propertyStatuses,
    });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

module.exports = { getPropertyStatuses };
