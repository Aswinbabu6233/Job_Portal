import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import BASE_API from "../utils/BaseUrl";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const auth = useSelector((state) => state.user);
  const token = auth?.token;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${BASE_API}/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Only keep applications relevant to employer
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    };

    if (token) fetchApplications();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Job Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-700">
            No applications received yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div
                key={app._id || index}
                className="bg-white rounded shadow p-4 space-y-2 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {app.job?.title || "Untitled Job"}
                </h3>
                <p className="text-sm text-gray-600">
                  Applicant: {app.applicant?.name || "Anonymous"}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {app.applicant?.email || "Not provided"}
                </p>
                <p className="text-sm text-gray-700">
                  Cover Letter:{" "}
                  <span className="italic">
                    {app.coverLetter?.length > 100
                      ? app.coverLetter.slice(0, 100) + "..."
                      : app.coverLetter || "None"}
                  </span>
                </p>
                {app.resume && (
                  <a
                    href={`https://jobnest-backend-wld8.onrender.com${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Download Resume
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
