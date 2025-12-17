/**
 * Component Tests for JobCard
 * Tests job card rendering and navigation
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobCard from '../../src/components/JobCard';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('JobCard Component', () => {
  const mockJob = {
    _id: '123456789',
    company: 'Test Company',
    position: 'Software Developer',
    status: 'pending'
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render job information correctly', () => {
    render(
      <BrowserRouter>
        <JobCard job={mockJob} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Company: Test Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Position: Software Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: pending/i)).toBeInTheDocument();
  });

  it('should have an Edit button', () => {
    render(
      <BrowserRouter>
        <JobCard job={mockJob} />
      </BrowserRouter>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it('should navigate to edit page when Edit button is clicked', () => {
    render(
      <BrowserRouter>
        <JobCard job={mockJob} />
      </BrowserRouter>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/jobs/${mockJob._id}/edit`);
  });

  it('should display different status values', () => {
    const jobWithInterview = { ...mockJob, status: 'interview' };

    const { rerender } = render(
      <BrowserRouter>
        <JobCard job={jobWithInterview} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Status: interview/i)).toBeInTheDocument();

    const jobWithDeclined = { ...mockJob, status: 'declined' };
    rerender(
      <BrowserRouter>
        <JobCard job={jobWithDeclined} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Status: declined/i)).toBeInTheDocument();
  });
});
