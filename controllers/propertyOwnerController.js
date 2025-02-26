const { matchedData } = require("express-validator");
const { addPropertyService } = require("../services/propertyOnwerService");

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

module.exports = { addProperty };
