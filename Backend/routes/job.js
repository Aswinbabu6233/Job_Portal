const express = require("express");

const {
  isEmployer,
  authenticate,
  isUser,
} = require("../middleware/authentication");

const upload = require("../middleware/upload");

const {
  applytoJob,
  createJob,
  deleteJob,
  getAllJobs,
  getJobByID,
  updateJob,
  getjobbyemployerID,
} = require("../controllers/JobController");

module.exports = (io) => {
  const router = express.Router();

  router.get("/", getAllJobs);

  router.get("/employer/jobs", authenticate, isEmployer, getjobbyemployerID);

  router.get("/:id", getJobByID);
  router.post("/", authenticate, isEmployer, (req, res) =>
    createJob(req, res, io)
  );
  router.put("/:id", authenticate, isEmployer, updateJob);
  router.delete("/:id", authenticate, isEmployer, deleteJob);
  router.post(
    "/:id/apply",
    authenticate,
    isUser,
    upload.single("resume"), // ✅ Only resume is uploaded as a file
    (req, res) => applytoJob(req, res, io)
  );

  return router;
};
