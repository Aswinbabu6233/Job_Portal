const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles"); // Create this folder
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, and PNG images are allowed"), false);
  }
};

const uploadProfile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

module.exports = uploadProfile;
