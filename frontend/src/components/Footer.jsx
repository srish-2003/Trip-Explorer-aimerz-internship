/**
 * @fileoverview Footer component.
 * Displays application footer content such as branding, copyright,
 * and optional navigation links.
 */
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} RoadTrip Planner. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
