import React, { useState, useEffect } from "react";
import { Timer, Award } from "lucide-react";
import { openDB } from "idb";
import Navbar from "../Components/Navbar";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const db = await openDB("QuizDB", 1);

        if (!db.objectStoreNames.contains("attempts")) {
          console.warn("Object store 'attempts' not found in IndexedDB.");
          setHistory([]); 
          return;
        }

        const allAttempts = await db.getAll("attempts");
        console.log("Fetched history:", allAttempts);
        setHistory(allAttempts);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl shadow-lg bg-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-indigo-600">Quiz History</h1>

          {loading ? (
            <p className="text-gray-600 mt-4">Loading quiz attempts...</p>
          ) : history.length === 0 ? (
            <p className="text-gray-600 mt-4">No quiz attempts found.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {history.map((attempt, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition">
                  <h2 className="text-lg font-semibold text-indigo-700">{attempt.quizName}</h2>
                  <p className="text-gray-600 text-sm">
                    Date: {new Date(attempt.date).toLocaleString()}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700 font-medium">
                    <Award className="h-5 w-5 text-yellow-500" /> Score: {attempt.score} / {attempt.totalQuestions}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
