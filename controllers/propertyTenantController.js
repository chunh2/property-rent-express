const { matchedData } = require("express-validator");
const {
  getPropertiesService,
  getPropertyService,
} = require("../services/propertyTenantService");

const getProperties = async (req, res) => {
  const data = matchedData(req);

  console.log(data);

  try {
    const { properties, count } = await getPropertiesService(data);

    return res.status(200).json({
      message: "Properties retrieved successfully",
      count,
      data: properties,
    });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

const getProperty = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const property = await getPropertyService(id);

    return res
      .status(200)
      .json({ message: "Property retrieved successfully", data: property });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

module.exports = { getProperties, getProperty };
