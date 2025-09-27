const express = require("express");
const {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getMyTrips,
} = require("../controllers/trip.controllers");
const ensureAuthenticated = require("../middleware/auth.middleware");

const router = express.Router();

// ✅ Public routes
router.get("/", getTrips);// fetch all trips
router.get("/:id", getTripById);// fetch single trip by ID

// ✅ Protected routes (require login via JWT cookie)
router.post("/", ensureAuthenticated, createTrip);           // create a new trip
router.put("/:id", ensureAuthenticated, updateTrip);         // update a trip (owner only)
router.delete("/:id", ensureAuthenticated, deleteTrip);      // delete a trip (owner only)
router.get("/my/trips", ensureAuthenticated, getMyTrips);    // fetch trips of logged-in user

module.exports = router;
