/**
 * Error Classes Index
 * Centralized export of all custom error classes
 * @module errors
 */

const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');
const CustomApiError = require('./custom-api');

/**
 * Exports all custom error classes for easy import
 * @exports errors
 */
module.exports = {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  CustomApiError,
};