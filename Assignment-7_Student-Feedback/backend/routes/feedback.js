// routes/feedback.js
// Defines the API routes for feedback operations

const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// ─────────────────────────────────────────────
// POST /feedback
// Save a new feedback entry to the database
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, subject, rating, comments } = req.body;

    // Basic server-side validation
    if (!name || !subject || !rating) {
      return res.status(400).json({
        success: false,
        message: "Name, subject, and rating are required fields.",
      });
    }

    // Create and save the new feedback document
    const feedback = new Feedback({ name, subject, rating, comments });
    const saved = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      data: saved,
    });
  } catch (error) {
    console.error("Error saving feedback:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

// ─────────────────────────────────────────────
// GET /feedback
// Fetch all feedback entries, newest first
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

module.exports = router;
