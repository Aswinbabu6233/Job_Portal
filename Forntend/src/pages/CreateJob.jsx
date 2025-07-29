import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import BASE_URL from "../utils/Base_url";

const CreateJob = () => {
  const auth = useSelector((state) => state.user); // holds { token, user }
  const user = auth?.user;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);

  // Autofill company from user profile (read-only)
  useEffect(() => {
    if (user?.company) {
      setFormData((prev) => ({ ...prev, company: user.company }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/jobs`,
        {
          ...formData,
          requirements: formData.requirements
            .split(",")
            .map((req) => req.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("✅ Job posted successfully!");

      setFormData((prev) => ({
        ...prev,
        title: "",
        description: "",
        location: "",
        salary: "",
        requirements: "",
      }));
    } catch (error) {
      console.error("Job post error:", error);
      toast.error(error.response?.data?.message || "❌ Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Post a New Job
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
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
