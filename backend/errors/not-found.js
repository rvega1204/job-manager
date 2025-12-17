/**
 * Not Found Error
 * Error class for 404 Not Found responses
 * @module errors/not-found
 */

const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./custom-api');

/**
 * Error class for resource not found scenarios (404 status code)
 * Used when a requested resource doesn't exist
 * @class NotFoundError
 * @extends CustomApiError
 */
class NotFoundError extends CustomApiError {
  /**
   * Creates a not found error
   * @param {string} message - Error message describing what was not found
   */
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;