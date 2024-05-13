import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaUser, FaEllipsisH, FaReact } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* App Icon and Name */}
        <div className="flex items-center text-white">
          <FaReact className="text-xl mr-2" />
          <span className="text-lg font-semibold mr-4">My App</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Home */}
          <Link to="/" className="text-white flex items-center transition duration-300 hover:text-purple-400">
            <FaHome className="text-xl" />
            <span className="ml-2">Home</span>
          </Link>

          {/* Profile */}
          <Link to="/profile" className="text-white flex items-center transition duration-300 hover:text-purple-400">
            <FaUser className="text-xl" />
            <span className="ml-2">Profile</span>
          </Link>

          {/* More Button */}
          <Link to="/more" className="text-white flex items-center transition duration-300 hover:text-purple-400">
            <FaEllipsisH className="text-xl" />
            <span className="ml-2">More</span>
          </Link>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:bg-gray-600"
            />
            <span className="absolute right-0 top-0 mt-3 mr-4">
              <FaSearch className="text-gray-500" />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
