import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

import Homepage from "./Pages/HomePage";
import QuizPage from "./Pages/QuizPage";
import HistoryPage from "./Pages/HistoryPage";

function App() {
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route path="/History" element={<HistoryPage />} />
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;

