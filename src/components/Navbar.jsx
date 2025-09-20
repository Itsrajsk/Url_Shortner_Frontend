// Navbar.jsx
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import the Link component
import { useStoreContext } from "../context/ContextApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <nav className="relative bg-white shadow-sm border-b border-gray-200 py-4 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <img
            src="/images/link.png"
            alt="Linklytics Logo"
            className="h-8 w-auto"
          />
          <span className="ml-3 text-2xl font-bold text-gray-900">
            {/* Use Link for the brand name */}
            <Link to="/" className="">
              Linklytics
            </Link>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-x-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
          >
            About
          </Link>
          {token && (
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-x-4">
          {!token ? (
            <Link
              to="/register"
              className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={onLogOutHandler}
              className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Corrected Mobile Menu */}
      <div
        className={`absolute inset-x-0 top-full bg-white z-50 shadow-lg transition-all duration-300 ease-in-out lg:hidden ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center py-4 px-6 space-y-4 border-b border-gray-200">
          {/* Use Link for all internal navigation */}
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 w-full text-center py-2 rounded transition-colors duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 w-full text-center py-2 rounded transition-colors duration-300"
            onClick={toggleMenu}
          >
            About
          </Link>
          <div className="w-full h-px bg-gray-200 my-2" />
          {/* Use Link for the Sign In button */}
          <Link
            to="/register"
            className="bg-gray-900 text-white font-semibold w-full py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 text-center"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
          {/* <Link
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full w-full py-2 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Get Started
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
