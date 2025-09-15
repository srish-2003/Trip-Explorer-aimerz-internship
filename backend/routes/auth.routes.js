const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const protect = require('../middleware/auth.middleware')

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.post("/logout",authController.userLogout);

// Example protected route (for profile)
router.get("/profile", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});



module.exports = router;