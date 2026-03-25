// src/pages/ViewFeedback.js — Page that displays all feedback entries

import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackCard from "../components/FeedbackCard";

function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  // Fetch all feedback entries when the component mounts
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("/feedback");
        setFeedbacks(res.data.data);
      } catch (err) {
        setError("Failed to load feedback. Please check that the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Calculate the average rating across all entries
  const avgRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : null;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Page heading */}
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "1.8rem",
            color: "#1a3557",
            marginBottom: "0.4rem",
          }}
        >
          All Feedback
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
          Showing all submitted feedback entries, newest first.
        </p>
      </div>

      {/* Stats bar — shown when data is available */}
      {!loading && !error && feedbacks.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Total Responses", value: feedbacks.length },
            { label: "Average Rating",  value: `${avgRating} / 5` },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "1rem 1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                minWidth: "160px",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#2563eb",
                  marginTop: "2px",
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "#6b7280",
            fontSize: "0.9rem",
          }}
        >
          Loading feedback...
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            color: "#dc2626",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && feedbacks.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1.5rem",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          }}
        >
          <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
            No feedback has been submitted yet.
          </p>
          <a
            href="/submit"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              color: "#2563eb",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Be the first to submit feedback
          </a>
        </div>
      )}

      {/* Feedback cards grid */}
      {!loading && !error && feedbacks.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewFeedback;
