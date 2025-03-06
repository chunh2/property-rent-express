const { PropertyImage } = require("../models");
const fs = require("fs");
const path = require("path");
const deleteFile = require("../utils/deleteFile");

const checkCountPropertyImagesMiddleware = async (req, res, next) => {
  const {
    params: { id },
    files = [],
    body: { property_images_ids_DELETE = [] },
  } = req;

  const propertyImages = await PropertyImage.findAll({
    where: {
      property_id: id,
    },
  });

  //   extract id field
  const existingIds = propertyImages.map((propertyImage) =>
    parseInt(propertyImage.id)
  );

  //   filter id that exist in database
  const validDeletions = property_images_ids_DELETE.filter((id) =>
    existingIds.includes(parseInt(id))
  );

  req.body.validDeletions = validDeletions;

  console.log(validDeletions);

  // check count, considering:
  // 1. existing images (in DB)
  // 2. new images
  // 3. images to be deleted
  const count = propertyImages.length + files.length - validDeletions.length;

  console.log(count);

  if (count > 10) {
    await Promise.all(files.map((file) => deleteFile(file.path)));

    return res
      .status(400)
      .json({ error: "Images exceeds maximum limit of 10" });
  }

  if (count <= 0) {
    await Promise.all(files.map((file) => deleteFile(file.path)));

    return res
      .status(400)
      .json({ error: "Remaining image cannot less than 1 image" });
  }

  next();
};

module.exports = checkCountPropertyImagesMiddleware;
