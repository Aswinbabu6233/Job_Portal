import React, { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useSelector((state) => state.user); // holds { token, user }
  const user = auth?.user;
  const Employerpresent = user?.role === "employer";

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
              <Link to="/CreateJob" className="hover:text-gray-200">
                Create Job
              </Link>
              <Link to="/" className="hover:text-gray-200">
                All Jobs
              </Link>
              <Link to="/employee/applications" className="hover:text-gray-200">
                Applications
              </Link>
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
            </div>
          )}
    </nav>
  );
};

export default Navbar;
