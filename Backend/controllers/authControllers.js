const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role, company } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file ? req.file.path : "";

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      profile: profileImage,
      company: role === "employer" ? company : "",
    });

    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Invalid Username Or Password",
      });
    }
    const token = JWT.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        profile: user.profile,
        company: user.company,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Save Job
exports.saveJob = async (req, res) => {
  try {
    const { id } = req.params; // job ID
    const user = await User.findById(req.user.userId);

    if (user.savedJobs.includes(id)) {
      return res.status(400).json({ message: "Job already saved" });
    }

    user.savedJobs.push(id);
    await user.save();
    res.status(200).json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save job", error: err.message });
  }
};

// Get Saved Jobs
exports.getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("savedJobs");
    res.status(200).json({ jobs: user.savedJobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch saved jobs", error: err.message });
  }
};

// Unsave Job
exports.unsaveJob = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.userId);

    if (!user.savedJobs.includes(id)) {
      return res.status(400).json({ message: "Job not found in saved list" });
    }

    user.savedJobs = user.savedJobs.filter((jobId) => jobId.toString() !== id);
    await user.save();

    res.status(200).json({ message: "Job unsaved successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to unsave job", error: err.message });
  }
};
