import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-indigo-600">Quiz</span>
          <span className="text-2xl font-bold text-gray-800">Now</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </NavLink>
          <NavLink to="/QuizPage" className="text-gray-600 hover:text-gray-900">
            Quiz
          </NavLink>
          <NavLink to="/History" className="text-gray-600 hover:text-gray-900">
            History
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLink to="/" className="block text-gray-600 hover:text-gray-900">
            Home
          </NavLink>
          <NavLink to="/quiz" className="block text-gray-600 hover:text-gray-900">
            Quiz
          </NavLink>
          <NavLink to="/history" className="block text-gray-600 hover:text-gray-900">
            History
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;