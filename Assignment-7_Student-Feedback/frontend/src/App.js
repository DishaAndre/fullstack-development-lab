// src/App.js — Root component with routing and layout

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FeedbackForm from "./pages/FeedbackForm";
import ViewFeedback from "./pages/ViewFeedback";

function App() {
  return (
    <Router>
      {/* Persistent navigation bar across all pages */}
      <Navbar />

      {/* Main content area */}
      <main style={{ minHeight: "calc(100vh - 64px)" }}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/submit"    element={<FeedbackForm />} />
          <Route path="/view"      element={<ViewFeedback />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
