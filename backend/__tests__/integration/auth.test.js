/**
 * Integration Tests for Authentication Routes
 * Tests registration and login endpoints
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const User = require('../../models/User');

// Mock the User model methods
jest.mock('../../models/User');

describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        ...userData,
        createToken: jest.fn().mockReturnValue('mock-jwt-token')
      };

      User.create = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      // Mock duplicate email error - Mongoose returns 500 for DB errors
      const duplicateError = new Error('E11000 duplicate key error');
      duplicateError.code = 11000;
      User.create = jest.fn().mockRejectedValue(duplicateError);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });

    it('should return error for missing fields', async () => {
      // Mock Mongoose validation error
      const validationError = new Error('User validation failed');
      validationError.name = 'ValidationError';
      validationError.errors = {
        name: { message: 'Name is required' },
        password: { message: 'Password is required' }
      };
      User.create = jest.fn().mockRejectedValue(validationError);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com'
        })
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login with correct credentials', async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        comparePasswords: jest.fn().mockResolvedValue(true),
        createToken: jest.fn().mockReturnValue('mock-jwt-token')
      };

      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('name');
    });

    it('should return error for wrong password', async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        comparePasswords: jest.fn().mockResolvedValue(false)
      };

      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should return error for non-existent email', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should return error for missing credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com'
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });
});
