/**
 * User Model
 * Mongoose schema and model for user authentication and management
 * @module models/User
 */

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

/**
 * User Schema Definition
 * Defines the structure, validation rules, and methods for user documents
 * @typedef {Object} UserSchema
 * @property {string} name - User's display name (required, max 50 chars, trimmed)
 * @property {string} email - User's email address (required, unique, validated, lowercase, trimmed)
 * @property {string} password - User's hashed password (required, auto-hashed before save)
 * @property {Date} createdAt - Timestamp when user was created (auto-generated)
 * @property {Date} updatedAt - Timestamp when user was last updated (auto-generated)
 */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      maxlength: [50, "Username cannot exceed 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

/**
 * Pre-save middleware to hash password before storing
 * Only hashes if password was modified to avoid re-hashing on updates
 */
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compares a plain text password with the hashed password
 * @param {string} password - Plain text password to compare
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
}

/**
 * Generates a JWT token for the user
 * @returns {string} Signed JWT token valid for 30 days
 */
UserSchema.methods.createToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = mongoose.model("User", UserSchema);
