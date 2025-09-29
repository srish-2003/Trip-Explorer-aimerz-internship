/**
 * @fileoverview Landing page component.
 * Displays the homepage UI with navigation and footer.
 * Serves as the entry point for users visiting the app.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
/**
 * UserLandingPage component serves as the personalized landing page for logged-in users.
 * It displays a hero section with a background image, logo, and call-to-action buttons.
 * Users can navigate to the homepage or log out of their account.
 *
 * Features:
 * - Fetches the logged-in user's information from localStorage
 * - Full-screen background image with a dark overlay
 * - Displays personalized greeting with the user's username
 * - Logout button to clear local storage and redirect to the landing page
 * - Hero section with title, description, and CTA button to navigate to /home

 */
const UserLandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background */}
      <div
        className="relative flex-grow bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${assets.background_image})` }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Navbar */}
        <div className="relative z-8 flex items-center justify-between px-8">
          <img
            src={assets.logo}
            alt="logo"
            className="h-40 md:h-42 drop-shadow-lg"
          />
          <button
            onClick={handleLogout}
            className="bg-green-900 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 py-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Hey {user?.username || "Explorer"}!</h1>
          <p className="max-w-2xl text-lg mb-6">
            Discover, create, and share amazing road trips around the world.
            Adventure starts here!
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-green-700 hover:bg-green-900 px-6 py-3 rounded-lg shadow text-lg transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;


