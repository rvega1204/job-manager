/**
 * Jobs Routes
 * Defines routes for job management (CRUD operations)
 * @module routes/jobs
 * Base path: /api/v1/jobs
 * All routes require authentication via JWT token
 */

const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const validateObjectId = require("../middlewares/validateObjectId");
const router = express.Router();

// GET /api/v1/jobs - Get all jobs for authenticated user
router.get("/", getAllJobs);

// POST /api/v1/jobs - Create a new job
router.post("/", createJob);

// GET /api/v1/jobs/:id - Get a single job by ID (requires valid ObjectId)
router.get("/:id", validateObjectId(), getJob);

// PATCH /api/v1/jobs/:id - Update a job by ID (requires valid ObjectId)
router.patch("/:id", validateObjectId(), updateJob);

// DELETE /api/v1/jobs/:id - Delete a job by ID (requires valid ObjectId)
router.delete("/:id", validateObjectId(), deleteJob);

module.exports = router;
