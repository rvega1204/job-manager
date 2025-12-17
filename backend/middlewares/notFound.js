/**
 * Not Found Middleware
 * Handles requests to non-existent routes
 * @module middlewares/notFound
 */

const { StatusCodes } = require('http-status-codes');

/**
 * Middleware for handling 404 Not Found errors
 * Catches all requests that don't match any defined routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} 404 response with error message
 */
const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('Route does not exist');
}

module.exports = notFound;