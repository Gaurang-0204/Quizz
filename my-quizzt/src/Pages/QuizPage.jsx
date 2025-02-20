// import React, { useState, useEffect } from "react";
// import { Timer } from "lucide-react";
// import Navbar from "../Components/Navbar";
// import { saveQuizAttempt } from "../indexDB";

// const QuizPage = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [timer, setTimer] = useState(30);
//   const [userInput, setUserInput] = useState("");

//   const quizName = "General Knowledge Quiz";

//   const questions = [
//     {
//       type: "mcq",
//       question: "Which planet is closest to the Sun?",
//       options: ["Venus", "Mercury", "Earth", "Mars"],
//       correct: 1,
//       explanation: "Mercury is the closest planet to the Sun.",
//     },
//     {
//       type: "mcq",
//       question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
//       options: ["Stack", "Queue", "Tree", "Graph"],
//       correct: 1,
//       explanation: "A Queue follows the FIFO (First-In, First-Out) principle.",
//     },
//     {
//       type: "mcq",
//       question: "Which of the following is primarily used for structuring web pages?",
//       options: ["Python", "Java", "HTML", "C++"],
//       correct: 2,
//       explanation: "HTML (HyperText Markup Language) is used to structure web pages.",
//     },
//     {
//       type: "mcq",
//       question: "Which chemical symbol stands for Gold?",
//       options: ["Au", "Gd", "Ag", "Pt"],
//       correct: 0,
//       explanation: "The chemical symbol for Gold is Au.",
//     },
//     {
//       type: "mcq",
//       question: "Which of these processes is not typically involved in refining petroleum?",
//       options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
//       correct: 3,
//       explanation: "Filtration is not typically used in petroleum refining.",
//     },
//     {
//       type: "integer",
//       question: "What is the value of 12 + 28?",
//       correct: "40",
//       explanation: "12 + 28 equals 40.",
//     },
//     {
//       type: "integer",
//       question: "How many states are there in the United States?",
//       correct: "50",
//       explanation: "There are 50 states in the United States.",
//     },
//     {
//       type: "integer",
//       question: "In which year was the Declaration of Independence signed?",
//       correct: "1776",
//       explanation: "The Declaration of Independence was signed in 1776.",
//     },
//     {
//       type: "integer",
//       question: "What is the value of pi rounded to the nearest integer?",
//       correct: "3",
//       explanation: "The value of pi (π) rounded to the nearest integer is 3.",
//     },
//     {
//       type: "integer",
//       question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
//       correct: "120",
//       explanation: "Speed × Time = Distance, so 60 mph × 2 hours = 120 miles.",
//     },
//   ];

//   // Timer logic
//   useEffect(() => {
//     if (timer > 0 && !isAnswered) {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     } else if (timer === 0) {
//       handleNext();
//     }
//   }, [timer, isAnswered]);

//   // Handle multiple-choice selection
//   const handleAnswer = (selectedIndex) => {
//     if (isAnswered) return;
//     setSelectedAnswer(selectedIndex);
//     if (selectedIndex === questions[currentQuestion].correct) {
//       setScore(score + 1);
//     }
//     setIsAnswered(true);
//   };

//   // Handle integer input validation and submission
//   const handleIntegerSubmit = () => {
//     if (userInput.trim() === "" || isNaN(userInput)) return;
//     if (parseInt(userInput) === parseInt(questions[currentQuestion].correct)) {
//       setScore(score + 1);
//     }
//     setIsAnswered(true);
//   };

//   // Handle moving to the next question or showing results
//   const handleNext = () => {
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null);
//       setIsAnswered(false);
//       setTimer(30);
//       setUserInput("");
//     } else {
//       setShowResult(true);
//       saveQuizAttempt(quizName, score, questions.length)
//         .then(() => console.log("Quiz attempt saved!"))
//         .catch((error) => console.error("Error saving quiz attempt:", error));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex items-center justify-center min-h-[80vh] px-4">
//         <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-bold text-blue-600">
//             {showResult ? "Quiz Results" : quizName}
//           </h1>

//           {!showResult ? (
//             <>
//               {/* Progress Bar */}
//               <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
//                 <div
//                   className="h-full bg-blue-600 transition-all"
//                   style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
//                 ></div>
//               </div>

//               {/* Question Info */}
//               <div className="flex justify-between items-center mt-4">
//                 <p className="text-sm text-gray-600">
//                   Question {currentQuestion + 1} of {questions.length}
//                 </p>
//                 <div className="flex items-center gap-2 text-gray-500">
//                   <Timer className="h-4 w-4" />
//                   <span className="text-sm font-medium">{timer}s</span>
//                 </div>
//               </div>

//               {/* Question */}
//               <p className="text-lg font-medium mt-4">{questions[currentQuestion].question}</p>

//               {/* Answer Section */}
//               <div className="grid gap-3 mt-4">
//                 {questions[currentQuestion].type === "mcq" ? (
//                   questions[currentQuestion].options.map((option, index) => (
//                     <button
//                       key={index}
//                       className={`p-4 w-full text-left rounded-md border transition-all ${
//                         isAnswered
//                           ? index === questions[currentQuestion].correct
//                             ? "bg-green-100 text-green-700 border-green-500"
//                             : "bg-gray-100 text-gray-700 border-gray-300"
//                           : "bg-white border-gray-300 hover:bg-gray-100"
//                       }`}
//                       onClick={() => handleAnswer(index)}
//                       disabled={isAnswered}
//                     >
//                       {String.fromCharCode(65 + index)}. {option}
//                     </button>
//                   ))
//                 ) : (
//                   <div>
//                     <input
//                       type="number"
//                       className="w-full p-3 border border-gray-300 rounded-md"
//                       placeholder="Enter your answer"
//                       value={userInput}
//                       onChange={(e) => setUserInput(e.target.value)}
//                       disabled={isAnswered}
//                     />
//                     <button
//                       className="mt-3 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
//                       onClick={handleIntegerSubmit}
//                       disabled={isAnswered}
//                     >
//                       Submit Answer
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Next Button */}
//               {isAnswered && (
//                 <button
//                   className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
//                   onClick={handleNext}
//                 >
//                   Next
//                 </button>
//               )}
//             </>
//           ) : (
//             // Quiz Result
//             <>
//               <p className="text-4xl font-bold text-indigo-600">
//                 You Scored {score}/{questions.length}
//               </p>
//               <button
//                 className="mt-4 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
//                 onClick={() => window.location.reload()}
//               >
//                 Try Again
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizPage;


// import React, { useState, useEffect } from "react";
// import { Timer } from "lucide-react";
// import Navbar from "../Components/Navbar";
// import { saveQuizAttempt } from "../indexDB";

// const QuizPage = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [timer, setTimer] = useState(30);
//   const [userInput, setUserInput] = useState("");

//   const quizName = "General Knowledge Quiz";
  
 
  
//   useEffect(() => {
//     if (timer > 0 && !isAnswered) {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     } else if (timer === 0) {
//       handleNext();
//     }
//   }, [timer, isAnswered]);
  
//   const handleAnswer = (selectedIndex) => {
//     if (isAnswered) return;
//     setSelectedAnswer(selectedIndex);
//     if (selectedIndex === questions[currentQuestion].correct) {
//       setScore(score + 1);
//     }
//     setIsAnswered(true);
//   };

//   const handleIntegerSubmit = () => {
//     if (userInput.trim() === "" || isNaN(userInput)) return;
//     if (parseInt(userInput) === parseInt(questions[currentQuestion].correct)) {
//       setScore(score + 1);
//     }
//     setIsAnswered(true);
//   };

//   const handleNext = () => {
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null);
//       setIsAnswered(false);
//       setTimer(30);
//       setUserInput("");
//     } else {
//       setShowResult(true);
//       saveQuizAttempt(quizName, score, questions.length)
//         .then(() => console.log("Quiz attempt saved!"))
//         .catch((error) => console.error("Error saving quiz attempt:", error));
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       setSelectedAnswer(null);
//       setIsAnswered(false);
//       setTimer(30);
//       setUserInput("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex items-center justify-center min-h-[80vh] px-4">
//         <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-bold text-blue-600">
//             {showResult ? "Quiz Results" : quizName}
//           </h1>
//           {!showResult ? (
//             <>
//               <p className="text-lg font-medium mt-4">{questions[currentQuestion].question}</p>
//               <div className="grid gap-3 mt-4">
//                 {questions[currentQuestion].type === "mcq" ? (
//                   questions[currentQuestion].options.map((option, index) => (
//                     <button key={index} onClick={() => handleAnswer(index)}>{option}</button>
//                   ))
//                 ) : (
//                   <input
//                     type="number"
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                   />
//                 )}
//               </div>
//               <div className="flex justify-between mt-4">
//                 {currentQuestion > 0 && (
//                   <button onClick={handlePrev} className="p-2 bg-gray-300">Previous</button>
//                 )}
//                 {currentQuestion < questions.length - 1 && (
//                   <button onClick={handleNext} className="p-2 bg-blue-600 text-white">Next</button>
//                 )}
//                 {currentQuestion === questions.length - 1 && (
//                   <button onClick={handleIntegerSubmit} className="p-2 bg-green-600 text-white">Submit</button>
//                 )}
//               </div>
//             </>
//           ) : (
//             <p>You Scored {score}/{questions.length}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizPage;


import React, { useState, useEffect } from "react";
import { Timer, ChevronLeft, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      handleNext();
    }
  }, [timer, isAnswered]);

  const handleAnswer = (selectedIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleIntegerSubmit = () => {
    if (userInput.trim() === "" || isNaN(userInput)) return;
    if (parseInt(userInput) === parseInt(questions[currentQuestion].correct)) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

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

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimer(30);
      setUserInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">
                {showResult ? "Quiz Results" : quizName}
              </h1>
              {!showResult && (
                <div className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg">
                  <Timer className="text-white" size={20} />
                  <span className="text-white font-medium">{timer}s</span>
                </div>
              )}
            </div>
            {!showResult && (
              <div className="mt-4 text-blue-100">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            )}
          </div>

          {!showResult ? (
            <div className="p-6">
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
                <div 
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h2 className="text-xl text-gray-800 font-medium mb-6">
                {questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].type === "mcq" ? (
                  questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full p-4 text-left rounded-lg border transition-colors
                        ${selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-500'}
                        ${isAnswered && index === questions[currentQuestion].correct ? 'bg-green-50 border-green-500' : ''}
                        ${isAnswered && index === selectedAnswer && index !== questions[currentQuestion].correct ? 'bg-red-50 border-red-500' : ''}
                      `}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <div className="space-y-4">
                    <input
                      type="number"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="w-full p-4 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your answer..."
                    />
                    <button
                      onClick={handleIntegerSubmit}
                      disabled={isAnswered}
                      className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Answer
                    </button>
                  </div>
                )}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  {questions[currentQuestion].explanation}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors
                    ${currentQuestion === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                  `}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <p className="text-xl text-gray-600 mb-8">
                You scored {score} out of {questions.length} questions correctly
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;