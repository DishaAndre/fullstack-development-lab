// src/pages/FeedbackForm.js — Form page to submit feedback

import React, { useState } from "react";
import axios from "axios";

// Initial empty form state
const INITIAL_FORM = { name: "", subject: "", rating: "", comments: "" };

// Reusable label + input wrapper
function Field({ label, required, children, error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#374151",
          letterSpacing: "0.01em",
        }}
      >
        {label}
        {required && <span style={{ color: "#dc2626", marginLeft: "3px" }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: "0.78rem", color: "#dc2626" }}>{error}</span>
      )}
    </div>
  );
}

// Shared input style
const inputStyle = {
  padding: "0.65rem 0.85rem",
  border: "1px solid #d1d5db",
  borderRadius: "7px",
  fontSize: "0.9rem",
  color: "#111827",
  backgroundColor: "#ffffff",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  width: "100%",
};

function FeedbackForm() {
  const [form, setForm]         = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [serverError, setServerError] = useState("");

  // Update a single field in the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Client-side validation — returns error map
  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Student name is required.";
    if (!form.subject.trim()) errs.subject = "Subject is required.";
    if (!form.rating)         errs.rating  = "Please select a rating.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess(false);

    // Run validation
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      // POST to backend API
      await axios.post("/feedback", {
        name:     form.name.trim(),
        subject:  form.subject.trim(),
        rating:   Number(form.rating),
        comments: form.comments.trim(),
      });

      // Reset form and show success banner
      setForm(INITIAL_FORM);
      setErrors({});
      setSuccess(true);
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Page heading */}
      <h2
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "1.8rem",
          color: "#1a3557",
          marginBottom: "0.4rem",
        }}
      >
        Submit Feedback
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "2rem" }}>
        All fields marked with an asterisk are required.
      </p>

      {/* Success banner */}
      {success && (
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "8px",
            padding: "0.85rem 1.1rem",
            marginBottom: "1.5rem",
            color: "#16a34a",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          Feedback submitted successfully. Thank you for your response.
        </div>
      )}

      {/* Server error banner */}
      {serverError && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            padding: "0.85rem 1.1rem",
            marginBottom: "1.5rem",
            color: "#dc2626",
            fontSize: "0.9rem",
          }}
        >
          {serverError}
        </div>
      )}

      {/* Form card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

            {/* Student Name */}
            <Field label="Student Name" required error={errors.name}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{
                  ...inputStyle,
                  borderColor: errors.name ? "#dc2626" : "#d1d5db",
                }}
              />
            </Field>

            {/* Subject */}
            <Field label="Subject" required error={errors.subject}>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Mathematics, Physics"
                style={{
                  ...inputStyle,
                  borderColor: errors.subject ? "#dc2626" : "#d1d5db",
                }}
              />
            </Field>

            {/* Rating */}
            <Field label="Rating" required error={errors.rating}>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.rating ? "#dc2626" : "#d1d5db",
                  appearance: "auto",
                  cursor: "pointer",
                }}
              >
                <option value="">-- Select a rating --</option>
                <option value="1">1 — Poor</option>
                <option value="2">2 — Fair</option>
                <option value="3">3 — Good</option>
                <option value="4">4 — Very Good</option>
                <option value="5">5 — Excellent</option>
              </select>
            </Field>

            {/* Comments */}
            <Field label="Comments">
              <textarea
                name="comments"
                value={form.comments}
                onChange={handleChange}
                placeholder="Share any additional thoughts (optional)"
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "100px",
                }}
              />
            </Field>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "0.5rem",
                backgroundColor: loading ? "#93c5fd" : "#2563eb",
                color: "#ffffff",
                border: "none",
                padding: "0.75rem",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
                width: "100%",
              }}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
