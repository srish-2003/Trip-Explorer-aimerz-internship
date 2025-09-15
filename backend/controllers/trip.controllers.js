// backend/controllers/tripController.js
const RoadTrip = require("../models/trip_model");
const User = require("../models/user_models");

// ✅ Public: fetch all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await RoadTrip.find()
      .populate("createdBy", "username email")
      .lean();
    res.status(200).json({ success: true, trips });
  } catch (err) {
    console.error("getTrips error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Public: fetch single trip by id
exports.getTripById = async (req, res) => {
  try {
    const trip = await RoadTrip.findById(req.params.id).populate("createdBy", "username email");
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });

    res.status(200).json({ success: true, trip });
  } catch (err) {
    console.error("getTripById error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Protected: create new trip
exports.createTrip = async (req, res) => {
  try {
    const { title, description, startPoint, destination, waypoints } = req.body;

    if (!title || !startPoint || !destination) {
      return res.status(400).json({ success: false, message: "Title, startPoint and destination are required" });
    }

    const trip = await RoadTrip.create({
      title,
      description,
      startPoint,
      destination,
      waypoints: waypoints || [],
      createdBy: req.user._id, // comes from protect middleware
    });

    // Link trip to user's profile (avoid duplicates)
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { roadTrips: trip._id } });

    res.status(201).json({ success: true, message: "Trip created successfully", trip });
  } catch (err) {
    console.error("createTrip error:", err);
    res.status(400).json({ success: false, message: "Invalid data", error: err.message });
  }
};

// ✅ Protected: update a trip (only owner)
exports.updateTrip = async (req, res) => {
  try {
    const trip = await RoadTrip.findById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });

    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this trip" });
    }

    const updated = await RoadTrip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Trip updated", trip: updated });
  } catch (err) {
    console.error("updateTrip error:", err);
    res.status(400).json({ success: false, message: "Invalid update", error: err.message });
  }
};

// ✅ Protected: delete a trip (only owner)
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await RoadTrip.findById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });

    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this trip" });
    }

    await trip.deleteOne();
    await User.findByIdAndUpdate(req.user._id, { $pull: { roadTrips: trip._id } });

    res.status(200).json({ success: true, message: "Trip deleted" });
  } catch (err) {
    console.error("deleteTrip error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Protected: get trips created by logged-in user
exports.getMyTrips = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("roadTrips");
    res.status(200).json({ success: true, trips: user.roadTrips || [] });
  } catch (err) {
    console.error("getMyTrips error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

