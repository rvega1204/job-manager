/**
 * ProtectedRoutes Component
 * Wrapper component for routes that require authentication
 * @component
 */

import NotFound from './NotFound'

/**
 * Checks for JWT token in localStorage
 * Renders children if token exists, otherwise shows NotFound page
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {JSX.Element} Children components or NotFound page
 */
const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <NotFound />
  }

  return children
}
export default ProtectedRoutes
