const User = require("../models/user_models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || "dev-secret";

// Create User:end point for USER-SIGNUP
exports.userSignup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Required fields are missing" })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exist. Please log into your account' })
        }//agar return nhi kra to function aage bhi chlega aur random errors aaenge
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
        // res.status(201).json({
        //     message: "user registered successfully", user
        // });// yaha return nhi kra kyuki waise bhi end of function hai
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


//user Login :- using jwt authentication
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Required fields are missing" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ success: false, message: "user not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "incorrect email or password" })
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            email,
            username:user.username
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "user not found" })
    }
}

