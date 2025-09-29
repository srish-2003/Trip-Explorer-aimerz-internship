/**
 * @fileoverview Routes to save trip and get users profile.
 */
const express = require('express');
const { 
    saveTrip, 
    getMe 
} = require('../controllers/user.controllers');
const ensureAuthenticated = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current logged-in user's profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 */
router.get('/me', ensureAuthenticated, getMe);

/**
 * @swagger
 * /api/users/save-trip/{tripId}:
 *   post:
 *     summary: Save a specific trip to the user's account
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the trip to save
 *     responses:
 *       200:
 *         description: Trip saved successfully
 */
// Route to save a specific trip to the user's account
router.post('/save-trip/:tripId', ensureAuthenticated, saveTrip);

module.exports = router;
