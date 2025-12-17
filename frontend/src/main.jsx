/**
 * Main Entry Point
 * Initializes and renders the React application
 * @module main
 */

import { createRoot } from 'react-dom/client'
import router from './router'
import { RouterProvider } from 'react-router-dom'

/**
 * Creates the React root and renders the application with React Router
 */
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
