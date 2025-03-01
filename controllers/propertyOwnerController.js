const { matchedData } = require("express-validator");
const {
  addPropertyService,
  getPropertiesService,
  updatePropertyService,
  deletePropertyService,
} = require("../services/propertyOnwerService");

const addProperty = async (req, res) => {
  const data = matchedData(req);
  const { decoded, files } = req;

  console.log(data);
  try {
    const property = await addPropertyService(data, decoded, files);

    return res
      .status(201)
      .json({ message: "Property added successfully", data: property });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

const getProperties = async (req, res) => {
  const { user_id } = req.decoded;
  const data = matchedData(req);

  try {
    const { count, properties } = await getPropertiesService(user_id, data);

    return res
      .status(200)
      .json({ message: "Properties found", count, data: properties });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

const updateProperty = async (req, res) => {
  const data = matchedData(req);
  const {
    decoded: { user_id },
  } = req;

  try {
    await updatePropertyService(data, user_id);

    return res.status(200).json({ message: "Property updated successfully" });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

const deleteProperty = async (req, res) => {
  const {
    params: { id },
    decoded: { user_id },
  } = req;

  try {
    await deletePropertyService(id, user_id);

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (e) {
    return res.status(e.statusCode).json({ error: e.message });
  }
};

module.exports = { addProperty, getProperties, updateProperty, deleteProperty };
