import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import BASE_API from "../utils/BaseUrl";

const Jobdetail = () => {
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.user); // holds { token, user }
  const user = auth?.user;
  const userpresent = user?.role === "job_seeker";
  const Employerpresent = user?.role === "employer";
  const token = auth?.token;

  const { id } = useParams();

  const deletejob = async () => {
    try {
      const del = await axios.delete(`${BASE_API}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(del.data?.message);
      toast.success(del.data.message || "Deleted Successfully :)");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${BASE_API}/jobs/${id}`);
      setJob(response.data); // response is a single job object
    } catch (error) {
      toast.error("Error fetching the job details");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />

      {job ? (
        <main className="flex-1 max-w-5xl mx-auto px-4 py-10 bg-white shadow-md rounded-lg mt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h2>
          <p className="text-gray-600 text-sm mb-1">
            {job.company} · {job.location}
          </p>
          <p className="text-gray-700 flex items-center  font-medium mb-4">
            ₹{job.salary + " per Year"}
          </p>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Job Description
            </h3>
            <p className="text-gray-700">{job.description}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Requirements
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {job.requirements?.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </section>

          {Employerpresent ? (
            <div className="flex gap-x-10 items-center">
              <Link
                to={`/update/${id}`}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Update
              </Link>
              <button
                onClick={deletejob}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={userpresent ? `/${id}/apply` : `/login`}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Apply Now
            </Link>
          )}
        </main>
      ) : (
        <p className="text-center mt-10 text-gray-600">
          Loading job details...
        </p>
      )}
    </div>
  );
};

export default Jobdetail;
