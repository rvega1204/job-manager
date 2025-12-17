/**
 * Jobs Controller
 * Handles CRUD operations for job postings
 */

const { NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");

/**
 * Retrieves all jobs for the authenticated user
 * @async
 * @param {Object} req - Express request object with authenticated user info
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with job count and array of jobs sorted by creation date
 */
const getAllJobs = async (req, res) => {
  const { userId } = req.user;
  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

/**
 * Creates a new job posting for the authenticated user
 * @async
 * @param {Object} req - Express request object with job data in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the created job
 */
const createJob = async (req, res) => {
  const { userId } = req.user;
  req.body.createdBy = userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

/**
 * Retrieves a single job by ID for the authenticated user
 * @async
 * @param {Object} req - Express request object with job ID in params
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If job doesn't exist or doesn't belong to user
 * @returns {Object} JSON response with the requested job
 */
const getJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;
  const job = await Job.findOne({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json({ job });
};

/**
 * Updates an existing job for the authenticated user
 * @async
 * @param {Object} req - Express request object with job ID in params and update data in body
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If job doesn't exist or doesn't belong to user
 * @returns {Object} JSON response with the updated job
 */
const updateJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;
  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json({ job });
};

/**
 * Deletes a job for the authenticated user
 * @async
 * @param {Object} req - Express request object with job ID in params
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If job doesn't exist or doesn't belong to user
 * @returns {Object} Empty JSON response on successful deletion
 */
const deleteJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;
  const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json();
};

module.exports = { getAllJobs, createJob, getJob, updateJob, deleteJob };
