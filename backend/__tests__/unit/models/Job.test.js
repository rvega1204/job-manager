/**
 * Unit Tests for Job Model
 * Tests job schema validation and required fields
 */

const mongoose = require('mongoose');
const Job = require('../../../models/Job');

describe('Job Model Tests', () => {
  describe('Job Schema Validation', () => {
    it('should require company, position, and createdBy', async () => {
      const job = new Job({});

      let err;
      try {
        await job.validate();
      } catch (error) {
        err = error;
      }

      expect(err.errors.company).toBeDefined();
      expect(err.errors.position).toBeDefined();
      expect(err.errors.createdBy).toBeDefined();
    });

    it('should have default status as pending', () => {
      const job = new Job({
        company: 'Test Company',
        position: 'Developer',
        createdBy: new mongoose.Types.ObjectId()
      });

      expect(job.status).toBe('pending');
    });

    it('should only accept valid status values', async () => {
      const job = new Job({
        company: 'Test Company',
        position: 'Developer',
        status: 'invalid-status',
        createdBy: new mongoose.Types.ObjectId()
      });

      let err;
      try {
        await job.validate();
      } catch (error) {
        err = error;
      }

      expect(err.errors.status).toBeDefined();
    });

    it('should accept interview, pending, or declined as status', async () => {
      const statuses = ['interview', 'pending', 'declined'];

      for (const status of statuses) {
        const job = new Job({
          company: 'Test Company',
          position: 'Developer',
          status: status,
          createdBy: new mongoose.Types.ObjectId()
        });

        const err = job.validateSync();
        expect(err).toBeUndefined();
      }
    });

    it('should enforce max length for company name', async () => {
      const longCompany = 'a'.repeat(51);
      const job = new Job({
        company: longCompany,
        position: 'Developer',
        createdBy: new mongoose.Types.ObjectId()
      });

      let err;
      try {
        await job.validate();
      } catch (error) {
        err = error;
      }

      expect(err.errors.company).toBeDefined();
    });

    it('should enforce max length for position', async () => {
      const longPosition = 'a'.repeat(101);
      const job = new Job({
        company: 'Test Company',
        position: longPosition,
        createdBy: new mongoose.Types.ObjectId()
      });

      let err;
      try {
        await job.validate();
      } catch (error) {
        err = error;
      }

      expect(err.errors.position).toBeDefined();
    });

    it('should create valid job with correct data', () => {
      const job = new Job({
        company: 'Test Company',
        position: 'Developer',
        status: 'interview',
        createdBy: new mongoose.Types.ObjectId()
      });

      const err = job.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('Job Timestamps', () => {
    it('should have createdAt and updatedAt fields', () => {
      const job = new Job({
        company: 'Test Company',
        position: 'Developer',
        createdBy: new mongoose.Types.ObjectId()
      });

      expect(job.schema.path('createdAt')).toBeDefined();
      expect(job.schema.path('updatedAt')).toBeDefined();
    });
  });
});
