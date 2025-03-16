const { getPropertyTypesService } = require("../services/propertyTypeService");

const getPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await getPropertyTypesService();

    return res.status(200).json({
      message: "Property types retrieved successfully",
      data: propertyTypes,
    });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
};

module.exports = { getPropertyTypes };
