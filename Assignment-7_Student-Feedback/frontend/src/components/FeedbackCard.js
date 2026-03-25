// src/components/FeedbackCard.js — Displays a single feedback entry

import React from "react";

// Renders filled and empty blocks to represent the rating visually
function RatingBar({ rating }) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          style={{
            width: "20px",
            height: "6px",
            borderRadius: "3px",
            backgroundColor: n <= rating ? "#2563eb" : "#dbeafe",
          }}
        />
      ))}
      <span
        style={{
          marginLeft: "8px",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#2563eb",
        }}
      >
        {rating}/5
      </span>
    </div>
  );
}

function FeedbackCard({ feedback }) {
  const { name, subject, rating, comments, createdAt } = feedback;

  // Format the date into a readable string
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)")
      }
    >
      {/* Header: name and date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p style={{ fontWeight: 600, fontSize: "1rem", color: "#111827" }}>
            {name}
          </p>
          <span
            style={{
              display: "inline-block",
              marginTop: "4px",
              backgroundColor: "#f0f6ff",
              color: "#2563eb",
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "2px 10px",
              borderRadius: "20px",
              border: "1px solid #dbeafe",
            }}
          >
            {subject}
          </span>
        </div>
        <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
          {formattedDate}
        </span>
      </div>

      {/* Rating bar */}
      <RatingBar rating={rating} />

      {/* Comments */}
      {comments && (
        <p
          style={{
            fontSize: "0.9rem",
            color: "#4b5563",
            lineHeight: "1.6",
            borderTop: "1px solid #f3f4f6",
            paddingTop: "0.75rem",
          }}
        >
          {comments}
        </p>
      )}
    </div>
  );
}

export default FeedbackCard;
