const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
    },
    requirements: {
      type: [String],
      default: [],
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
