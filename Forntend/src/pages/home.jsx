import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { socket } from "../utils/socketio"; // assuming this is how you import it
import Jobcard from "../components/jobcard";
import Navbar from "../components/navbar";
import BASE_API from "../utils/BaseUrl";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const auth = useSelector((state) => state.user);
  const user = auth?.user;
  const token = auth?.token;

  const fetchJobs = async () => {
    try {
      let url = `${BASE_API}/api/jobs`;
      const config = {};

      if (user?.role === "employer") {
        url = `${BASE_API}/api/jobs/employer/jobs`;
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await axios.get(url, config);
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs", error);
      toast.error("Error fetching jobs");
    }
  };

  useEffect(() => {
    if (token) {
      fetchJobs();
    }

    socket.on("job_created", (newJob) => {
      toast.success(`New job posted: ${newJob.title}`);
      setJobs((prevJobs) => [newJob, ...prevJobs]);
    });

    return () => {
      socket.off("job_created");
    };
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Jobcard
              key={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              path={job._id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
