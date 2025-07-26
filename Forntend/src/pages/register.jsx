import React, { useState } from "react";
import { BriefcaseBusiness, User } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    company: "",
  });
  const [profile, setProfile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      return toast.error("Please select a role");
    }

    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      if (formData.role === "employer") {
        data.append("company", formData.company);
      }
      if (profile) {
        data.append("profile", profile);
      }

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Registration successful!");
      console.log(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      <div className="w-full max-w-md">
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold mb-3">Create Account</h1>
          <div className="flex justify-evenly">
            <button
              type="button"
              onClick={() => handleRoleSelect("job_seeker")}
              className={`flex items-center gap-x-2 font-medium py-2.5 px-4 rounded-lg shadow-md transition-all duration-200 ${
                formData.role === "job_seeker"
                  ? "bg-purple-700 text-white"
                  : "bg-gradient-to-r from-purple-500 to-blue-400 text-white"
              }`}
            >
              <User className="h-4 w-4" />
              Candidate
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("employer")}
              className={`flex items-center gap-x-2 font-medium py-2.5 px-4 rounded-lg shadow-md transition-all duration-200 ${
                formData.role === "employer"
                  ? "bg-blue-700 text-white"
                  : "bg-gradient-to-r from-blue-500 to-purple-400 text-white"
              }`}
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Employee
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div>
              <label className="text-sm font-medium mb-1 text-gray-800">
                User Name
              </label>
              <input
                name="username"
                type="text"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 text-gray-800">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 text-gray-800">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            {formData.role === "employer" && (
              <div>
                <label className="text-sm font-medium mb-1 text-gray-800">
                  Company Name
                </label>
                <input
                  name="company"
                  type="text"
                  placeholder="Company Inc."
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1 text-gray-800">
                Profile Photo
              </label>
              <input
                name="profile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
