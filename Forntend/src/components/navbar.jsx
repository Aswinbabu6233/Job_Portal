import React, { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../utils/authslice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.user); // holds { token, user }
  const user = auth?.user;
  const Employerpresent = user?.role === "employer";

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // logout

  return (
    <nav className="bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + App Name */}
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            <span className="text-xl font-bold tracking-wide">JobNest</span>
          </div>

          {/* Desktop Links */}
          {Employerpresent ? (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/CreateJob" className="hover:text-gray-200">
                Create Job
              </Link>
              <Link to="/" className="hover:text-gray-200">
                All Jobs
              </Link>
              <Link to="/employee/applications" className="hover:text-gray-200">
                Applications
              </Link>
              {user ? (
                <Link to="/profile" className="hover:text-gray-200">
                  <img
                    src={`https://job-portal-backend-uifu.onrender.com/${user.profile.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:text-gray-200">
                All Jobs
              </Link>
              <Link to="/saved" className="hover:text-gray-200">
                Saved
              </Link>
              <Link to="/applied" className="hover:text-gray-200">
                Applied Jobs
              </Link>
              {user ? (
                <Link to="/profile" className="hover:text-gray-200">
                  <img
                    src={`https://job-portal-backend-uifu.onrender.com/${user.profile.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {Employerpresent
        ? mobileMenuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 bg-gradient-to-br from-purple-700 to-blue-700">
              <Link to="/CreateJob" className="block hover:text-gray-200">
                Create Job
              </Link>
              <Link to="/" className="block hover:text-gray-200">
                All Jobs
              </Link>
              <Link
                to="/employee/applications"
                className=" block hover:text-gray-200"
              >
                Applications
              </Link>
              {user ? (
                <Link to="/profile" className=" block hover:text-gray-200">
                  <img
                    src={`https://job-portal-backend-uifu.onrender.com/${user.profile.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login" className="block hover:text-gray-200">
                  Login
                </Link>
              )}
            </div>
          )
        : mobileMenuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 bg-gradient-to-br from-purple-700 to-blue-700">
              <Link to="/" className="block hover:text-gray-200">
                All Jobs
              </Link>
              <Link to="/saved" className="block hover:text-gray-200">
                Saved
              </Link>
              <Link to="/applied" className="block hover:text-gray-200">
                Applied Jobs
              </Link>
              {user ? (
                <Link to="/profile" className="hover:text-gray-200">
                  <img
                    src={`https://job-portal-backend-uifu.onrender.com/${user.profile.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login" className="block hover:text-gray-200">
                  Login
                </Link>
              )}
            </div>
          )}
    </nav>
  );
};

export default Navbar;
