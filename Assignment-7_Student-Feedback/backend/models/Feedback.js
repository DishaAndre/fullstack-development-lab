// models/Feedback.js
// Defines the MongoDB schema for a feedback entry

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    // Student's full name
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    // Subject being reviewed
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject cannot exceed 100 characters"],
    },

    // Rating between 1 and 5
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    // Optional detailed comments
    comments: {
      type: String,
      trim: true,
      maxlength: [1000, "Comments cannot exceed 1000 characters"],
      default: "",
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
