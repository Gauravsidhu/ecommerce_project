// middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "product_single_images");  // Single image
    } else if (file.fieldname === "multipleImages") {
      cb(null, "product_multiple_images");  // Multiple images
    } else {
      cb(null, "uploads/"); // Default fallback
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;
