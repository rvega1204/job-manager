/**
 * NavBar Component
 * Navigation bar for unauthenticated users with sign up and login links
 * @component
 */

import { Link } from 'react-router-dom'
import logo from '../assets/letter-j.png'

/**
 * Renders the navigation bar with logo and authentication buttons
 * Features a responsive Bootstrap navbar with sign up and login links
 * @returns {JSX.Element} Navigation bar component
 */
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
        <a href="#" className="navbar-brand">
          <img src={logo} width="40px" alt="Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-end gap-md-2"
          id="navbarNav"
        >
          <Link
            to="/signup"
            className="btn btn-lg btn-primary d-block mt-4 mb-3 mt-md-0 mb-md-0"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="btn btn-lg btn-outline-light d-block mb-4 mb-md-0"
          >
            Log in
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar
