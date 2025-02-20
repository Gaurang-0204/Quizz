import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const QuizHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
          General Knowledge Quiz
          </h1>

          <Link to="/QuizPage">
            <button
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white 
              rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 
              focus:ring-indigo-500 focus:ring-offset-2 transition-all"
              aria-label="Start JavaScript Quiz"
            >
              <span>Start Quiz</span>
              <ArrowUpRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizHomePage;