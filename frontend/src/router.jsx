/**
 * Router Configuration
 * Defines all application routes and their components
 * @module router
 */

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import UpdateJob from "./pages/UpdateJob";

/**
 * Application router configuration
 * Routes:
 * - / : Landing page (App)
 * - /login : User login page
 * - /signup : User registration page
 * - /dashboard : Protected dashboard page (requires authentication)
 * - /jobs/:id/edit : Protected job edit page (requires authentication)
 * - * : 404 Not Found page (catch-all route)
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoutes>
                <Dashboard />
            </ProtectedRoutes>
        )
    },
    {
        path: '/jobs/:id/edit',
        element: (
            <ProtectedRoutes>
                <UpdateJob />
            </ProtectedRoutes>
        )
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;