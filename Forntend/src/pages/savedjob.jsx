import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Jobcard from "../components/jobcard";
import axios from "axios";
import Navbar from "../components/navbar";
import BASE_API from "../utils/BaseUrl";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const auth = useSelector((state) => state.user); // { token, user }
  const token = auth?.token || localStorage.getItem("token");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${BASE_API}/auth/saved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSavedJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    if (token) {
      fetchSavedJobs();
    } else {
      setSavedJobs([]);
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Saved Jobs
        </h2>
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedJobs.map((job, i) => (
              <Jobcard
                key={job._id || i}
                company={job.company}
                description={job.description}
                location={job.location}
                title={job.title}
                path={job._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center mt-10">
            You haven’t saved any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
