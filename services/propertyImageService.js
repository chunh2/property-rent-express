const { PropertyImage } = require("../models");

const storePropertyImageService = async (property_id, files) => {
  const folder = `uploads/property-images/`;

  const propertyImages = files.map((file) => {
    return {
      property_id,
      image_path: `${folder}${file.filename}`,
    };
  });

  if (!propertyImages) {
    const error = new Error("Internal server error");
    error.statusCode = 500;
    throw error;
  }

  return await PropertyImage.bulkCreate(propertyImages);
};

module.exports = { storePropertyImageService };
