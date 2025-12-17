/**
 * Unit Tests for errorHandler Middleware
 * Tests global error handling
 */

const { StatusCodes } = require('http-status-codes');
const errorHandler = require('../../../middlewares/errorHandler');
const { CustomApiError, BadRequestError, NotFoundError } = require('../../../errors');

describe('errorHandler Middleware Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    console.error = jest.fn(); // Mock console.error
  });

  it('should handle CustomApiError with correct status code', () => {
    const error = new BadRequestError('Invalid input');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input' });
  });

  it('should handle NotFoundError with 404 status', () => {
    const error = new NotFoundError('Resource not found');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ message: 'Resource not found' });
  });

  it('should handle generic errors with 500 status', () => {
    const error = new Error('Something went wrong');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error:', error);
  });

  it('should include error message in response', () => {
    const errorMessage = 'Test error message';
    const error = new Error(errorMessage);

    errorHandler(error, req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage
      })
    );
  });

  it('should use default message for errors without message', () => {
    const error = new Error();
    error.message = '';

    errorHandler(error, req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Something went wrong'
      })
    );
  });
});
