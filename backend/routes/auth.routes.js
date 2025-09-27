const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const ensureAuthenticated = require("../middleware/auth.middleware");

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);

// Example protected route (for profile)
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.json({ success: true, user: req.user });
});
router.get("/home", ensureAuthenticated, (req, res) => {
  res.json({ success: true, user: req.user });
});



module.exports = router;