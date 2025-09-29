/**
 * @fileoverview Trip controllers for handling CRUD operations on trips.
 */

const RoadTrip = require("../models/trip_model");
const User = require("../models/user_models");

exports.createTrip = async (req, res) => {
  try {
    const { title, description, startPoint, destination, waypoints } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const trip = await RoadTrip.create({
      title,
      description,
      startPoint,
      destination,
      waypoints,
      createdBy: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { RoadTrip: trip._id },
    });

    res.status(201).json({ success: true, message: "Trip created successfully", trip });
  } catch (err) {
    console.error("Create Trip Error:", err);
    res.status(500).json({ success: false, message: "Failed to create trip" });
  }
};

exports.getAllPublicTrips = async (req, res) => {
    try {
        const trips = await RoadTrip.find({}).populate('createdBy', 'username');
        res.status(200).json({ success: true, trips });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

