const express = require("express");
const { createTrip, getAllPublicTrips } = require("../controllers/trip.controllers");
const ensureAuthenticated = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", ensureAuthenticated, createTrip);
router.get("/get-all-trips", ensureAuthenticated, getAllPublicTrips);

module.exports = router;