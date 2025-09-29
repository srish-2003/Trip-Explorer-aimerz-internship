/**
 * @fileoverview Routes for creating trip and fetching all trips.
 */
const express = require("express");
const { createTrip, getAllPublicTrips } = require("../controllers/trip.controllers");
const ensureAuthenticated = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/trips/:
 *   post:
 *     summary: Create a new trip
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", ensureAuthenticated, createTrip);

/**
 * @swagger
 * /api/trips/get-all-trips:
 *   get:
 *     summary: Get all public trips
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of trips
 */
router.get("/get-all-trips", ensureAuthenticated, getAllPublicTrips);

module.exports = router;