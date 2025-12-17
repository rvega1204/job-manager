/**
 * NotFound Page
 * 404 error page displayed for invalid routes
 * @component
 */

import { Link } from 'react-router-dom'

/**
 * Renders a simple 404 page with link to home
 * @returns {JSX.Element} Not found page component
 */
const NotFound = () => {
  return (
    <div className="text-center container mt-5">
      <h1>Page not found</h1>
      <Link to="/">Go back to home</Link>
    </div>
  )
}
export default NotFound
