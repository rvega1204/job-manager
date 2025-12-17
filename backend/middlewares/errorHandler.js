/**
 * Error Handler Middleware
 * Global error handler for Express application
 * Catches and formats all errors thrown in the application
 * @module middlewares/errorHandler
 */

const { StatusCodes } = require('http-status-codes');
const { CustomApiError } = require('../errors');

/**
 * Handles all errors thrown in the application
 * Differentiates between custom API errors and unexpected errors
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with error message and appropriate status code
 */
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    console.error('Error:', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || 'Something went wrong',
        error: err.toString()
    });
}

module.exports = errorHandler;