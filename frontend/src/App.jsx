import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserLandingPage from "./pages/UserLandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HomePage from "./pages/HomePage";
import CreateTrip from "./pages/CreateTrip"
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<ProtectedRoute><UserLandingPage /></ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
        <Route path="/create-trip" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>}/>
        <Route path="/user-account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;

