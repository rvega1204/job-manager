/**
 * Authentication Routes
 * Defines routes for user authentication (login and registration)
 * @module routes/auth
 * Base path: /api/v1/auth
 */

const express = require("express");
const { login, register } = require("../controllers/auth");
const router = express.Router();

// POST /api/v1/auth/login - Authenticate user and get token
router.post("/login", login);

// POST /api/v1/auth/register - Register new user and get token
router.post("/register", register);

module.exports = router;
