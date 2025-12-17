/**
 * Unit Tests for validateObjectId Middleware
 * Tests MongoDB ObjectId validation
 */

const mongoose = require('mongoose');
const validateObjectId = require('../../../middlewares/validateObjectId');
const { BadRequestError } = require('../../../errors');

describe('validateObjectId Middleware Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {}
    };
    res = {};
    next = jest.fn();
  });

  it('should call next() with valid ObjectId', () => {
    const validId = new mongoose.Types.ObjectId().toString();
    req.params.id = validId;

    const middleware = validateObjectId();
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  it('should throw BadRequestError with invalid ObjectId', () => {
    req.params.id = 'invalid-id';

    const middleware = validateObjectId();

    expect(() => {
      middleware(req, res, next);
    }).toThrow(BadRequestError);
  });

  it('should throw BadRequestError with empty string', () => {
    req.params.id = '';

    const middleware = validateObjectId();

    expect(() => {
      middleware(req, res, next);
    }).toThrow(BadRequestError);
  });

  it('should validate custom parameter name', () => {
    const validId = new mongoose.Types.ObjectId().toString();
    req.params.userId = validId;

    const middleware = validateObjectId('userId');
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should throw error for invalid custom parameter', () => {
    req.params.userId = 'invalid-id';

    const middleware = validateObjectId('userId');

    expect(() => {
      middleware(req, res, next);
    }).toThrow(BadRequestError);
  });

  it('should include parameter name in error message', () => {
    req.params.customId = 'invalid';

    const middleware = validateObjectId('customId');

    try {
      middleware(req, res, next);
    } catch (error) {
      expect(error.message).toContain('customId');
    }
  });
});
