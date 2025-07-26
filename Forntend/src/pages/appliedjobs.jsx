import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Appliedjobcard from "../components/appliedjobcard";
import axios from "axios";
import { useSelector } from "react-redux";

const Appliedjobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const auth = useSelector((state) => state.user);
  const token = auth?.token;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Extract job details from each application
        const jobs = response.data.map((app) => app.job);
        setAppliedJobs(jobs);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    };

    if (token) fetchApplications();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-2 py-8">
        <h2 className="text-center text-2xl font-medium mb-6">Applied Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job, index) => {
              if (!job) return null; // skip null job

              return (
                <Appliedjobcard
                  key={job._id || index}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  description={job.description}
                />
              );
            })
          ) : (
            <p className="text-gray-700 col-span-3 text-center">
              No jobs applied yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appliedjobs;
