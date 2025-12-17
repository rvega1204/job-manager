/**
 * Component Tests for ProtectedRoutes
 * Tests route protection logic
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '../../src/pages/ProtectedRoutes';

describe('ProtectedRoutes Component', () => {
  const TestChild = () => <div>Protected Content</div>;

  it('should render children when token exists', () => {
    localStorage.getItem = vi.fn(() => 'fake-jwt-token');

    render(
      <BrowserRouter>
        <ProtectedRoutes>
          <TestChild />
        </ProtectedRoutes>
      </BrowserRouter>
    );

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });

  it('should render NotFound when token does not exist', () => {
    localStorage.getItem = vi.fn(() => null);

    render(
      <BrowserRouter>
        <ProtectedRoutes>
          <TestChild />
        </ProtectedRoutes>
      </BrowserRouter>
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.queryByText(/protected content/i)).not.toBeInTheDocument();
  });

  it('should render NotFound when token is removed', () => {
    localStorage.getItem = vi.fn(() => 'fake-jwt-token');

    const { rerender } = render(
      <BrowserRouter>
        <ProtectedRoutes>
          <TestChild />
        </ProtectedRoutes>
      </BrowserRouter>
    );

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();

    localStorage.getItem = vi.fn(() => null);

    rerender(
      <BrowserRouter>
        <ProtectedRoutes>
          <TestChild />
        </ProtectedRoutes>
      </BrowserRouter>
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
