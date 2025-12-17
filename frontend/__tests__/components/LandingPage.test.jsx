/**
 * Component Tests for LandingPage
 * Tests landing page content and navigation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../../src/components/LandingPage';

describe('LandingPage Component', () => {
  it('should render the main heading', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /JOB MANAGER/i });
    expect(heading).toBeInTheDocument();
  });

  it('should render the description text', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Take control of your workday/i)).toBeInTheDocument();
  });

  it('should have a Get Started button', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const getStartedButton = screen.getByRole('link', { name: /get started/i });
    expect(getStartedButton).toBeInTheDocument();
  });

  it('should link Get Started button to signup page', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const getStartedButton = screen.getByRole('link', { name: /get started/i });
    expect(getStartedButton).toHaveAttribute('href', '/signup');
  });

  it('should display the whiteboard image', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
