/**
 * Database Connection
 * Handles MongoDB connection using Mongoose
 * @module db/connect
 */

const mongoose = require('mongoose');

/**
 * Connects to MongoDB database
 * @async
 * @param {string} url - MongoDB connection string URI
 * @returns {Promise} Mongoose connection promise
 * @throws {Error} If connection fails
 */
const connectDB = async (url) => {
  return mongoose.connect(url);
}

module.exports = connectDB;