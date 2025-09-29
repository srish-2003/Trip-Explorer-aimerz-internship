/**
 * @fileoverview User controllers for handling user profile operations.
 */

const User = require("../models/user_models");
const RoadTrip = require("../models/trip_model"); // Now correctly references the "RoadTrip" model

exports.saveTrip = async (req, res) => {
  try {
    const userId = req.user._id;
    const tripId = req.params.tripId;

    // Fetch user and trip in parallel
    const [user, tripToSave] = await Promise.all([
      User.findById(userId),
      RoadTrip.findById(tripId)
    ]);

    if (!tripToSave) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (tripToSave.createdBy.toString() === user._id.toString()) {
      return res.status(400).json({ success: false, message: "You cannot save your own trip." });
    }

    // Use some() for ObjectId comparison
    if (user.savedTrips.some(id => id.toString() === tripId)) {
      return res.status(400).json({ success: false, message: 'Trip already saved' });
    }

    user.savedTrips.push(tripId);
    await user.save(); // ✅ Save instance

    res.status(200).json({ success: true, message: 'Trip saved successfully' });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

