// const User = require("../models/user_models");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Create User:end point for USER-SIGNUP
// exports.createUser = async (req, res) => {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({ success: false, message: "Required fields are missing" })
//     }
//     try {
//         const existingUser = await User.findOne({ email })
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'User already exist. Please log into your account' })
//         }//agar return nhi kra to function aage bhi chlega aur random errors aaenge
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const user = await User.create({ username, email, password: hashedPassword });

//         res.status(201).json({
//             success: true,
//             message: "User registered successfully",
//             user
//         });
//         // res.status(201).json({
//         //     message: "user registered successfully", user
//         // });// yaha return nhi kra kyuki waise bhi end of function hai
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// };

// // Get All Users
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find().populate("roadTrips");
//         res.status(200).json({
//             message: "All users fetched successfully", users
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get Single User
// exports.getSingleUser = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email }).populate("roadTrips");
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({
//             message: "user fetched successfully", user
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Update User
// exports.updateUser = async (req, res) => {
//     try {
//         const updatedUser = await User.findOneAndUpdate(
//             { email: req.body.email },
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedUser) return res.status(404).json({ message: "User not found" });
//         res.status(200).json({
//             message: "user updated successfully", updatedUser
//         });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // findByIdAndUpdate is like “find the person with ID X and change their details”.

// // new: true → “show me the person’s new updated details, not the old ones.”

// // runValidators: true → “make sure the new details still follow the rules (like required email, valid format, etc.).”

// // Delete User
// exports.deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await User.findOneAndDelete({ email: req.body.email });
//         if (!deletedUser) return res.status(404).json({ message: "User not found" });
//         res.status(200).json({ message: "User deleted successfully" }, deletedUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };









const User = require('../models/user_models');
const Trip = require('../models/trip_model');

// Get the current user's profile, populating both created and saved trips
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate({ path: 'trips', populate: { path: 'user', select: 'username' } })
            .populate({ path: 'savedTrips', populate: { path: 'user', select: 'username' } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Save a trip to the user's 'savedTrips' array
exports.saveTrip = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const tripToSave = await Trip.findById(req.params.tripId);

        if (!tripToSave) {
            return res.status(404).json({ success: false, message: 'Trip not found' });
        }

        // Prevent saving a trip they created themselves or one that's already saved
        if (tripToSave.user.equals(user._id)) {
             return res.status(400).json({ success: false, message: 'You cannot save your own trip.' });
        }
        if (user.savedTrips.includes(tripToSave._id)) {
            return res.status(400).json({ success: false, message: 'Trip already saved' });
        }

        user.savedTrips.push(tripToSave._id);
        await user.save();

        res.status(200).json({ success: true, message: 'Trip saved successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};