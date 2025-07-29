import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveJob } from "../utils/savedjobslice";
import axios from "axios";

const Jobcard = ({ title, company, location, description, path }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user);
  const user = auth?.user;
  const token = auth?.token || localStorage.getItem("token");
  const userpresent = user?.role === "job_seeker";

  const savedJobs = useSelector((state) => state.savedJobs.jobs);
  const [saving, setSaving] = useState(false);

  const isSaved = savedJobs.some((id) => id === path);

  const handleSaveToggle = async () => {
    setSaving(true);
    try {
      if (isSaved) {
        await axios.delete(`http://localhost:3000/api/auth/unsave/${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(
          `http://localhost:3000/api/auth/save/${path}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      dispatch(toggleSaveJob(path));
    } catch (error) {
      console.error("Save/Unsave error:", error);
    } finally {
      setSaving(false);
    }
  };

  const shortDescription =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {company} · {location}
      </p>
      <p className="text-sm my-2">{shortDescription}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/${path}`}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>

        {userpresent && (
          <button
            onClick={handleSaveToggle}
            disabled={saving}
            className="ml-2 text-red-500 hover:text-red-700 transition"
          >
            {saving ? (
              <span className="animate-pulse text-red-400">Saving...</span>
            ) : isSaved ? (
              <HeartOff />
            ) : (
              <Heart />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Jobcard;
