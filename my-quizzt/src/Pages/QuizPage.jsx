import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import Navbar from "../Components/Navbar";
import { saveQuizAttempt } from "../indexDB";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(30);
  const [userInput, setUserInput] = useState("");

  const quizName = "General Knowledge Quiz";

  const questions = [
    {
      type: "mcq",
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: 1,
      explanation: "Mercury is the closest planet to the Sun.",
    },
    {
      type: "mcq",
      question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correct: 1,
      explanation: "A Queue follows the FIFO (First-In, First-Out) principle.",
    },
    {
      type: "mcq",
      question: "Which of the following is primarily used for structuring web pages?",
      options: ["Python", "Java", "HTML", "C++"],
      correct: 2,
      explanation: "HTML (HyperText Markup Language) is used to structure web pages.",
    },
    {
      type: "mcq",
      question: "Which chemical symbol stands for Gold?",
      options: ["Au", "Gd", "Ag", "Pt"],
      correct: 0,
      explanation: "The chemical symbol for Gold is Au.",
    },
    {
      type: "mcq",
      question: "Which of these processes is not typically involved in refining petroleum?",
      options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
      correct: 3,
      explanation: "Filtration is not typically used in petroleum refining.",
    },
    {
      type: "integer",
      question: "What is the value of 12 + 28?",
      correct: "40",
      explanation: "12 + 28 equals 40.",
    },
    {
      type: "integer",
      question: "How many states are there in the United States?",
      correct: "50",
      explanation: "There are 50 states in the United States.",
    },
    {
      type: "integer",
      question: "In which year was the Declaration of Independence signed?",
      correct: "1776",
      explanation: "The Declaration of Independence was signed in 1776.",
    },
    {
      type: "integer",
      question: "What is the value of pi rounded to the nearest integer?",
      correct: "3",
      explanation: "The value of pi (π) rounded to the nearest integer is 3.",
    },
    {
      type: "integer",
      question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      correct: "120",
      explanation: "Speed × Time = Distance, so 60 mph × 2 hours = 120 miles.",
    },
  ];

  // Timer logic
  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      handleNext();
    }
  }, [timer, isAnswered]);

  // Handle multiple-choice selection
  const handleAnswer = (selectedIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  // Handle integer input validation and submission
  const handleIntegerSubmit = () => {
    if (userInput.trim() === "" || isNaN(userInput)) return;
    if (parseInt(userInput) === parseInt(questions[currentQuestion].correct)) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  // Handle moving to the next question or showing results
  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimer(30);
      setUserInput("");
    } else {
      setShowResult(true);
      saveQuizAttempt(quizName, score, questions.length)
        .then(() => console.log("Quiz attempt saved!"))
        .catch((error) => console.error("Error saving quiz attempt:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-blue-600">
            {showResult ? "Quiz Results" : quizName}
          </h1>

          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Info */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <div className="flex items-center gap-2 text-gray-500">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm font-medium">{timer}s</span>
                </div>
              </div>

              {/* Question */}
              <p className="text-lg font-medium mt-4">{questions[currentQuestion].question}</p>

              {/* Answer Section */}
              <div className="grid gap-3 mt-4">
                {questions[currentQuestion].type === "mcq" ? (
                  questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`p-4 w-full text-left rounded-md border transition-all ${
                        isAnswered
                          ? index === questions[currentQuestion].correct
                            ? "bg-green-100 text-green-700 border-green-500"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </button>
                  ))
                ) : (
                  <div>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your answer"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={isAnswered}
                    />
                    <button
                      className="mt-3 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                      onClick={handleIntegerSubmit}
                      disabled={isAnswered}
                    >
                      Submit Answer
                    </button>
                  </div>
                )}
              </div>

              {/* Next Button */}
              {isAnswered && (
                <button
                  className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </>
          ) : (
            // Quiz Result
            <>
              <p className="text-4xl font-bold text-indigo-600">
                You Scored {score}/{questions.length}
              </p>
              <button
                className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
