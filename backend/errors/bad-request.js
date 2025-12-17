/**
 * Bad Request Error
 * Error class for 400 Bad Request responses
 * @module errors/bad-request
 */

const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./custom-api');

/**
 * Error class for bad request scenarios (400 status code)
 * Used when client sends invalid or malformed data
 * @class BadRequestError
 * @extends CustomApiError
 */
class BadRequestError extends CustomApiError {
  /**
   * Creates a bad request error
   * @param {string} message - Error message describing what was invalid
   */
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;