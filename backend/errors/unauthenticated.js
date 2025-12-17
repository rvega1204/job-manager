/**
 * Unauthenticated Error
 * Error class for 401 Unauthorized responses
 * @module errors/unauthenticated
 */

const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./custom-api');

/**
 * Error class for authentication failures (401 status code)
 * Used when authentication is required but failed or not provided
 * @class UnauthenticatedError
 * @extends CustomApiError
 */
class UnauthenticatedError extends CustomApiError {
  /**
   * Creates an unauthenticated error
   * @param {string} message - Error message describing the authentication failure
   */
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;