/**
 * Job Manager API Server
 * Main entry point for the Express.js backend application
 * Handles job posting management with user authentication
 * @module index
 */

require("express-async-errors");
require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const auth = require('./middlewares/authenticate');
const cors = require('cors');
const app = express();

// Middleware setup
// Configure CORS to allow requests from frontend
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://job-manager-r765.vercel.app'
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/v1/auth", authRoutes); // Authentication routes (login, register)
app.use("/api/v1/jobs", auth, jobRoutes); // Job routes (protected by auth middleware)

// Error handling middleware
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Global error handler

/**
 * Starts the Express server and connects to MongoDB
 * @async
 * @returns {Promise<void>}
 */
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("Connected to the database");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database", error);
  }
};

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  start();
}

// Export app for testing
module.exports = app;
