const validatePropertyImagesMiddleware = (req, res, next) => {
  // check if empty
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least 1 image is required" });
  }

  //   check max quantity
  if (req.files.length > 10) {
    return res.status(400).json({ error: "Can upload up to 10 images only" });
  }

  next();
};

module.exports = { validatePropertyImagesMiddleware };
