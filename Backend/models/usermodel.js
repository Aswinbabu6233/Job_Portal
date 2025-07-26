const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["job_seeker", "employer"],
      required: true,
    },
    profile: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
