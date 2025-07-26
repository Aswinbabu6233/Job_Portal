const express = require("express");
const { authenticate } = require("../middleware/authentication");
const { getAllApplications } = require("../controllers/applicationController");
const router = express.Router();

router.get("/", authenticate, getAllApplications);

module.exports = router;
