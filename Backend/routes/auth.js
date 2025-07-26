const express = require("express");
const {
  login,
  register,
  saveJob,
  getSavedJobs,
  unsaveJob,
} = require("../controllers/authControllers");
const uploadProfile = require("../middleware/uploadprofile");
const { authenticate, isUser } = require("../middleware/authentication");
const router = express.Router();

router.post("/register", uploadProfile.single("profile"), register);
router.post("/login", login);
router.post("/save/:id", authenticate, isUser, saveJob);
router.get("/saved", authenticate, isUser, getSavedJobs);
router.delete("/unsave/:id", authenticate, isUser, unsaveJob);

module.exports = router;
