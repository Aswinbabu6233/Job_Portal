import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const Userprofile = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.user); // holds { token, user }
  const user = auth?.user;
  console.log("User Profile:", user);

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    // Navigate to home page
    navigate("/");
  };
  return (
    // create a simple user profile  with usr name, photo, email and logout btn
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <div className="mx-auto mt-2 bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          User Profile
        </h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src={`http://localhost:3000/${user.profile.replace(/\\/g, "/")}`}
            alt="Profile"
            className="w-30 h-30 rounded-full"
          />

          <p className="text-lg font-medium">
            Username: {user?.username || "Guest"}
          </p>
          <p className="text-sm text-gray-600">Email: {user?.email || "N/A"}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Userprofile;
