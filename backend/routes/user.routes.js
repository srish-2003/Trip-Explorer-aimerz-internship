const express = require('express');
const { 
    saveTrip, 
    getMe 
} = require('../controllers/user.controllers');
const ensureAuthenticated = require('../middleware/auth.middleware');

const router = express.Router();

// Route to get the logged-in user's complete profile (created & saved trips)
router.get('/me', ensureAuthenticated, getMe);

// Route to save a specific trip to the user's account
router.post('/save-trip/:tripId', ensureAuthenticated, saveTrip);

module.exports = router;
