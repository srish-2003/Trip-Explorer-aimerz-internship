const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require("cors");
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

const userRoutes = require("./routes/user.routes");
const tripRoutes = require("./routes/trip.routes");
const authRoutes= require("./routes/auth.routes")
const dbConnection = require("./config/db");

dotenv.config();
dbConnection();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5000",credentials:true}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening`));

