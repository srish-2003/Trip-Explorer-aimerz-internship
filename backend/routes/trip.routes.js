const express = require("express");
const {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getMyTrips,
} = require("../controllers/trip.controllers");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

// ✅ Public routes
router.get("/", getTrips);// fetch all trips
router.get("/:id", getTripById);// fetch single trip by ID

// ✅ Protected routes (require login via JWT cookie)
router.post("/", protect, createTrip);           // create a new trip
router.put("/:id", protect, updateTrip);         // update a trip (owner only)
router.delete("/:id", protect, deleteTrip);      // delete a trip (owner only)
router.get("/my/trips", protect, getMyTrips);    // fetch trips of logged-in user

module.exports = router;
