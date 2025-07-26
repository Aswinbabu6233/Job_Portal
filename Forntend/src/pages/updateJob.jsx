import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import BASE_API from "../utils/BaseUrl";

const UpdateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.user); // { user, token }
  const token = auth?.token;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${BASE_API}/api/jobs/${id}`);
        const job = response.data;

        setFormData({
          title: job.title || "",
          description: job.description || "",
          location: job.location || "",
          salary: job.salary || "",
          requirements: job.requirements || "",
          company: job.company || "",
        });
      } catch (error) {
        toast.error("Error fetching job details");
        console.error(error);
      }
    };

    if (id) fetchJobDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${BASE_API}/api/jobs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Job updated successfully");
      navigate("/"); // or redirect to job details page
    } catch (error) {
      toast.error("Failed to update job");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update: {formData.title || "Job"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
            rows={4}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Requirements (comma separated)"
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="company"
            value={formData.company}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
