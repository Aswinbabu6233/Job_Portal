const Job = require("../models/Jobmodel");
const Application = require("../models/applicationmodel");

exports.getAllApplications = async (req, res) => {
  try {
    let applications;

    if (req.user.role === "employer") {
      const jobs = await Job.find({ employer: req.user.userId }).select("_id");
      const jobIds = jobs.map((job) => job._id);

      applications = await Application.find({ job: { $in: jobIds } })
        .populate("job")
        .populate("applicant");
    } else if (req.user.role === "job_seeker") {
      applications = await Application.find({ applicant: req.user.userId })
        .populate("job")
        .populate("applicant");
    } else {
      applications = await Application.find()
        .populate("job")
        .populate("applicant");
    }

    res.status(200).json(applications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: error.message });
  }
};
