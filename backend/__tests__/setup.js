/**
 * Jest Setup File
 * Global test configuration and mocks
 */

// Mock the database connection
jest.mock('../db/connect', () => {
  return jest.fn().mockResolvedValue({
    connection: {
      close: jest.fn()
    }
  });
});

// Set test environment variable
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
