/**
 * Authentication Controller
 * Handles user authentication operations including login and registration
 */

const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError} = require('../errors');

/**
 * Authenticates a user and returns a JWT token
 * @async
 * @param {Object} req - Express request object containing email and password in body
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If email or password is missing
 * @throws {UnauthenticatedError} If credentials are invalid
 * @returns {Object} JSON response with user name and JWT token
 */
const login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({email});
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isMatch = await user.comparePasswords(password);
  if (!isMatch) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createToken();
  res.status(StatusCodes.OK).json({ name: user.name, token });
}

/**
 * Registers a new user and returns a JWT token
 * @async
 * @param {Object} req - Express request object containing name, email, and password in body
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If required fields are missing or validation fails
 * @returns {Object} JSON response with user name and JWT token
 */
const register = async (req, res) => {
  const { name, password, email } = req.body;
  const newUser = await User.create({ name, password, email });
  const token = newUser.createToken();
  res.status(StatusCodes.OK).json({user: newUser.name, token});
}

module.exports = { login, register };