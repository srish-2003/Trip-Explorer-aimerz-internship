const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

const ensureAuthenticated = async (req, res, next) => {
  try {

    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ success: false, message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from decoded token
    const user = await User.findById(decoded.id)
    
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = ensureAuthenticated;


