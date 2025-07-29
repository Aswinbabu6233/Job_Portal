import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Applyjob = () => {
  const { id } = useParams(); // job ID from route
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.user); // holds { token, user }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/jobs/${id}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      toast.success(" Application submitted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed");
      console.error("Error submitting application:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <div className="max-w-md mx-auto bg-white shadow p-6 mt-10 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Submit Your Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="coverLetter" className="block font-medium mb-1">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows="6"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Write your cover letter..."
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="resume" className="block font-medium mb-1">
              Resume (PDF)
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Applyjob;
