// src/pages/Home.js — Landing / introduction page

import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Submit Feedback",
    description:
      "Fill out a simple form with your name, subject, rating, and comments.",
  },
  {
    title: "Rate Your Experience",
    description:
      "Provide a rating from 1 to 5 to help educators understand course quality.",
  },
  {
    title: "View All Responses",
    description:
      "Browse every feedback entry submitted, displayed in clean, readable cards.",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
      }}
    >
      {/* Hero section */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <h1
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#1a3557",
            lineHeight: "1.2",
            marginBottom: "1rem",
          }}
        >
          Student Feedback Review
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "#4b5563",
            maxWidth: "540px",
            margin: "0 auto 2rem",
            lineHeight: "1.7",
          }}
        >
          A straightforward platform for students to share feedback on courses
          and help improve the quality of education.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/submit")}
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Submit Feedback
          </button>
          <button
            onClick={() => navigate("/view")}
            style={{
              backgroundColor: "transparent",
              color: "#2563eb",
              border: "2px solid #2563eb",
              padding: "0.73rem 2rem",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f6ff")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            View Responses
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "3rem" }} />

      {/* Feature cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#dbeafe",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "0.9rem",
                color: "#2563eb",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {i + 1}
            </div>
            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "0.4rem",
              }}
            >
              {f.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: "1.6" }}>
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
