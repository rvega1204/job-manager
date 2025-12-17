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
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
})); // Enable Cross-Origin Resource Sharing
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
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
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
