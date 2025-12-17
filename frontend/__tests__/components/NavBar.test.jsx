/**
 * Component Tests for NavBar
 * Tests navigation bar links and responsiveness
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../src/components/NavBar';

describe('NavBar Component', () => {
  it('should render the logo', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('should have Sign up button', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const signupButton = screen.getByRole('link', { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();
  });

  it('should have Log in button', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('link', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('should link Sign up button to signup page', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const signupButton = screen.getByRole('link', { name: /sign up/i });
    expect(signupButton).toHaveAttribute('href', '/signup');
  });

  it('should link Log in button to login page', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('link', { name: /log in/i });
    expect(loginButton).toHaveAttribute('href', '/login');
  });

  it('should have navbar-toggler for mobile', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const toggler = screen.getByRole('button');
    expect(toggler).toHaveClass('navbar-toggler');
  });
});
