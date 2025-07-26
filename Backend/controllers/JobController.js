const Jobs = require("../models/Jobmodel");
const Application = require("../models/applicationmodel");
const User = require("../models/usermodel");

exports.getAllJobs = async (req, res) => {
  const jobs = await Jobs.find().populate("employer");
  res.json({
    jobs,
  });
};
exports.getjobbyemployerID = async (req, res) => {
  try {
    const jobs = await Jobs.find({ employer: req.user.userId }).populate(
      "applications"
    );
    res.status(200).json({ jobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch employer's jobs", error: err.message });
  }
};

exports.getJobByID = async (req, res) => {
  const job = await Jobs.findById(req.params.id).populate("applications");
  res.json(job);
};

exports.createJob = async (req, res, io) => {
  console.log("🔥 createJob hit"); // Debug log
  try {
    const employerId = req.user.userId;

    const employer = await User.findById(employerId);
    if (!employer || !employer.company) {
      return res
        .status(400)
        .json({ message: "Employer company information is missing." });
    }

    const jobData = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary,
      requirements: req.body.requirements,
      employer: employerId,
      company: employer.company,
    };

    const job = new Jobs(jobData);
    await job.save();

    io.emit("job_created", job);
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Server error while creating job" });
  }
};

exports.updateJob = async (req, res) => {
  const updated = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.deleteJob = async (req, res) => {
  await Jobs.findByIdAndDelete(req.params.id);
  res.json({
    message: "Job Deleted",
  });
};

exports.applytoJob = async (req, res, io) => {
  try {
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const applicationdetails = new Application({
      applicant: req.user.userId,
      job: req.params.id,
      resume: resumeFile.path,
      coverLetter: req.body.coverLetter || "", // ✅ From text field
    });

    await applicationdetails.save();

    await Jobs.findByIdAndUpdate(req.params.id, {
      $push: { applications: applicationdetails._id },
    });

    io.emit("applcation_received", {
      JobID: req.params.id,
      userId: req.user.userId,
    });

    res.status(200).json(applicationdetails);
  } catch (error) {
    console.error("Application Error", error);
    res.status(400).json({
      message: "Application Failed",
      error: error.message,
    });
  }
};
