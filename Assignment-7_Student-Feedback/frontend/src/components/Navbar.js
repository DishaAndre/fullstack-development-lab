// src/components/Navbar.js — Top navigation bar

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const styles = {
  nav: {
    backgroundColor: "#1a3557",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "1.25rem",
    color: "#ffffff",
    letterSpacing: "0.01em",
  },
  links: {
    display: "flex",
    gap: "0.5rem",
  },
  link: {
    color: "#93c5fd",
    fontSize: "0.9rem",
    fontWeight: 500,
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    transition: "background 0.15s, color 0.15s",
  },
  activeLink: {
    color: "#ffffff",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
};

function Navbar() {
  // NavLink provides the active state automatically based on the current route
  const getLinkStyle = ({ isActive }) =>
    isActive
      ? { ...styles.link, ...styles.activeLink }
      : styles.link;

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>Student Feedback</span>
      <div style={styles.links}>
        <NavLink to="/"       style={getLinkStyle} end>Home</NavLink>
        <NavLink to="/submit" style={getLinkStyle}>Submit</NavLink>
        <NavLink to="/view"   style={getLinkStyle}>View All</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
