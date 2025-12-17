/**
 * Unit Tests for User Model
 * Tests user schema validation, password hashing, and token generation
 */

const mongoose = require('mongoose');
const User = require('../../../models/User');

describe('User Model Tests', () => {
  describe('User Schema Validation', () => {
    it('should require name, email, and password', async () => {
      const user = new User({});

      let err;
      try {
        await user.validate();
      } catch (error) {
        err = error;
      }

      expect(err.errors.name).toBeDefined();
      expect(err.errors.email).toBeDefined();
      expect(err.errors.password).toBeDefined();
    });

    it('should validate email format', async () => {
      const user = new User({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123'
      });

      let err;
      try {
        await user.validate();
      } catch (error) {
        err = error;
      }

      expect(err.errors.email).toBeDefined();
    });

    it('should enforce max length for name', async () => {
      const longName = 'a'.repeat(51);
      const user = new User({
        name: longName,
        email: 'test@example.com',
        password: 'password123'
      });

      let err;
      try {
        await user.validate();
      } catch (error) {
        err = error;
      }

      expect(err.errors.name).toBeDefined();
    });

    it('should create valid user with correct data', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const err = user.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('Password Hashing', () => {
    it('should have password field that will be hashed on save', () => {
      const plainPassword = 'password123';
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: plainPassword
      });

      // Password is set initially as plain text
      expect(user.password).toBe(plainPassword);
      // After actual save to DB, it would be hashed by the pre-save hook
      // Note: We don't test DB operations in unit tests
    });
  });

  describe('User Methods', () => {
    it('should have comparePasswords method', () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      expect(typeof user.comparePasswords).toBe('function');
    });

    it('should have createToken method', () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      expect(typeof user.createToken).toBe('function');
    });

    it('should generate valid JWT token', () => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const token = user.createToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });
  });
});
