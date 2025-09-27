const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth.routes');
const tripRoutes = require('./routes/trip.routes');
const userRoutes = require('./routes/user.routes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Middleware Configuration ---

// 1. More Specific CORS Configuration
const allowedOrigins = ['http://localhost:5173']; // Your Vite frontend URL

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

// Use the new CORS options. This single line handles everything, including pre-flight.
app.use(cors(corsOptions));


// 2. Body Parsers to read JSON from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);


// --- Database Connection & Server Startup ---
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running successfully on http://localhost:${port}`);
});

