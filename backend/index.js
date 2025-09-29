/**
 * @fileoverview Entry point of the backend server for Trip Explorer.
 * Initializes Express app, connects to MongoDB, and sets up middleware and routes.
 */
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth.routes');
const tripRoutes = require('./routes/trip.routes');
const userRoutes = require('./routes/user.routes');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Middleware Configuration ---

// Allow requests from any origin
app.use(cors({
  origin: true, // allow all origins
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Swagger Configuration ---

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trip Explorer API",
      version: "1.0.0",
      description: "API documentation for Trip Explorer backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // point to your routes folder
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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


