/**
 * App Component
 * Root component for the landing page route
 * @component
 */

import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage'

/**
 * Renders the main landing page with navigation bar
 * @returns {JSX.Element} App component with NavBar and LandingPage
 */
const App = () => {
    return (
        <>
            <NavBar />
            <LandingPage />
        </>
    )
}

export default App
