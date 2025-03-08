const { matchedData } = require("express-validator");
const { getPropertiesService } = require("../services/propertyTenantService");

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

module.exports = { getProperties };
