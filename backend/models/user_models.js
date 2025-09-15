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
    roadTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoadTrip",
      },
    ],
    verifyOtp:{type:String, default:''},
    verifyOtpExpireAt:{type:Number, default:0},
    isUserVerified:{type:Boolean, default:false },
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type:Number, default:0}
  },
);
const userModel=mongoose.model.User || mongoose.model("User", userSchema)
module.exports = userModel;
