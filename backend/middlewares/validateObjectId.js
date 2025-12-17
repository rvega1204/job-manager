/**
 * ObjectId Validation Middleware
 * Validates MongoDB ObjectId format in route parameters
 * @module middlewares/validateObjectId
 */

const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");

/**
 * Creates a middleware function to validate MongoDB ObjectId parameters
 * @param {string} [paramName="id"] - The name of the parameter to validate (defaults to "id")
 * @returns {Function} Express middleware function that validates the specified parameter
 * @throws {BadRequestError} If the parameter is not a valid MongoDB ObjectId
 * @example
 * // In routes file:
 * router.get("/:id", validateObjectId(), getJob);
 * router.get("/:userId/posts", validateObjectId("userId"), getUserPosts);
 */
const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid ${paramName} format`);
    }

    next();
  };
};

module.exports = validateObjectId;
