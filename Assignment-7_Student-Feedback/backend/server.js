// server.js
// Main entry point for the Express backend server

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedback");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/studentfeedback";

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────

// Allow requests from the React frontend (localhost:3000)
app.use(cors({ origin: "http://localhost:3000" }));

// Parse incoming JSON request bodies
app.use(express.json());

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

// All feedback-related API routes live under /feedback
app.use("/feedback", feedbackRoutes);

// Root health-check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Student Feedback API is running." });
});

// ─────────────────────────────────────────────
// Database connection + Server start
// ─────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
