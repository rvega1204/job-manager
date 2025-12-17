/**
 * Job Model
 * Mongoose schema and model for job postings
 * @module models/Job
 */

const mongoose = require("mongoose");

/**
 * Job Schema Definition
 * Defines the structure and validation rules for job documents
 * @typedef {Object} JobSchema
 * @property {string} company - Company name (required, max 50 chars)
 * @property {string} position - Job position/title (required, max 100 chars)
 * @property {string} status - Application status (interview/pending/declined, default: pending)
 * @property {ObjectId} createdBy - Reference to User who created the job
 * @property {Date} createdAt - Timestamp when job was created (auto-generated)
 * @property {Date} updatedAt - Timestamp when job was last updated (auto-generated)
 */
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Position is rerquired"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "pending", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
