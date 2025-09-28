const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoadTrip",
      }
    ],
    savedTrips: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoadTrip'
    }]
  },
);
const userModel = mongoose.model.User || mongoose.model("User", userSchema)
module.exports = userModel;
