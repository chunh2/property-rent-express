const { matchedData } = require("express-validator");
const {
  addPropertyService,
  getPropertiesService,
} = require("../services/propertyOnwerService");

const addProperty = async (req, res) => {
  const data = matchedData(req);
  const { decoded } = req;

  console.log(data);
  try {
    const property = await addPropertyService(data, decoded);

    return res
      .status(201)
      .json({ message: "Property added successfully", data: property });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

const getProperties = async (req, res) => {
  const { user_id } = req.decoded;

  try {
    const properties = await getPropertiesService(user_id);

    return res
      .status(200)
      .json({ message: "Properties found", data: properties });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

module.exports = { addProperty, getProperties };
