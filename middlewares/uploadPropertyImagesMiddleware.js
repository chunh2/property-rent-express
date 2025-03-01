const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storePropertyImagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/property-images/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const name = `${crypto.randomUUID()}${extension}`;

    cb(null, name);
  },
});

const filterImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    const error = new Error("Only image files are allowed");
    error.statusCode = 400;
    cb(error, false);
  }
};

const uploadPropertyImagesMiddleware = (req, res, next) => {
  multer({
    storage: storePropertyImagesStorage,
    fileFilter: filterImage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }).array("property_images", 10)(req, res, (error) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    next();
  });
};

module.exports = { uploadPropertyImagesMiddleware };
