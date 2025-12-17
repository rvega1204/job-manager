/**
 * Component Tests for NotFound Page
 * Tests 404 page rendering and navigation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../../src/pages/NotFound';

describe('NotFound Page', () => {
  it('should render page not found message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('should have a link to go back home', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /go back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render within a container', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const mainDiv = container.querySelector('.container');
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass('text-center');
  });
});
