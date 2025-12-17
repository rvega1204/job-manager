/**
 * Custom API Error
 * Base class for all custom API errors in the application
 * @module errors/custom-api
 */

/**
 * Base error class for custom API errors
 * Extends the native Error class to provide consistent error handling
 * @class CustomApiError
 * @extends Error
 */
class CustomApiError extends Error {
  /**
   * Creates a custom API error
   * @param {string} message - Error message
   */
  constructor(message) {
    super(message);
  }
}

module.exports = CustomApiError;