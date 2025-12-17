/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes from unauthorized access
 * @module middlewares/authenticate
 */

const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using JWT tokens
 * Expects Authorization header with "Bearer <token>" format
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {UnauthenticatedError} If token is missing, invalid, or expired
 * @returns {void} Calls next() if authentication succeeds, adds userId to req.user
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError('Authentication Failed');
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: decoded.userId}
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Failed', error);
    }
}

module.exports = authenticate;