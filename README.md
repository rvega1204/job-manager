# Job Manager

A full-stack web application for managing job applications. Track your job search process, organize applications, and monitor their status all in one place.

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Job Management**: Create, read, update, and delete job applications
- **Status Tracking**: Track application status (Pending, Interview, Declined)
- **Responsive Design**: Mobile-friendly interface built with Bootstrap
- **Protected Routes**: Secure dashboard accessible only to authenticated users
- **Delete Confirmation**: Modal confirmation before deleting jobs

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Build tool and development server
- **Bootstrap 5** - CSS framework for styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JSON Web Tokens (JWT)** - Authentication
- **bcrypt.js** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

## Project Structure

```
job-manager/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions (axios instance)
│   │   ├── assets/        # Static assets (images, icons)
│   │   ├── App.jsx        # Root component
│   │   ├── main.jsx       # Entry point
│   │   └── router.jsx     # Route configuration
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # Express backend API
│   ├── controllers/       # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middleware
│   ├── errors/           # Custom error classes
│   ├── db/               # Database configuration
│   ├── index.js          # Server entry point
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rvega1204/job-manager.git
   cd job-manager
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND=http://localhost:3000
```

### Running the Application

#### Start the Backend Server
```bash
cd backend
npm start
```
The server will run on `http://localhost:3000`

#### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Jobs (Protected Routes)
- `GET /api/v1/jobs` - Get all jobs for authenticated user
- `POST /api/v1/jobs` - Create a new job
- `GET /api/v1/jobs/:id` - Get a specific job
- `PATCH /api/v1/jobs/:id` - Update a job
- `DELETE /api/v1/jobs/:id` - Delete a job

## Application Routes

- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - User dashboard (protected)
- `/jobs/:id/edit` - Edit job (protected)

## Features in Detail

### User Authentication
- Secure password hashing with bcrypt
- JWT token-based authentication
- Protected routes requiring valid tokens
- Automatic token inclusion in API requests

### Job Management
- Create jobs with company name and position
- Edit job details and update status
- Delete jobs with confirmation modal
- View all jobs in a responsive grid layout

### Security
- Password hashing before storage
- JWT token validation on protected routes
- CORS enabled for cross-origin requests
- MongoDB ObjectId validation middleware
- Custom error handling

## Development

### Code Documentation
All JavaScript and JSX files include JSDoc comments for better code understanding and maintainability.

### Error Handling
- Custom error classes for different HTTP status codes
- Global error handler middleware
- User-friendly error messages

### Input Validation
- Email format validation
- Password minimum length (6 characters)
- Name maximum length (50 characters)
- Required field validation

## Testing

The project includes comprehensive test suites for both frontend and backend.

### Backend Tests

The backend uses **Jest** and **Supertest** for testing.

**Test Structure:**
```
backend/__tests__/
├── unit/
│   ├── models/          # Model validation tests
│   ├── middlewares/     # Middleware logic tests
│   └── controllers/     # Controller tests
└── integration/         # API endpoint tests
```

**Running Backend Tests:**
```bash
cd backend

# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

**Test Coverage:**
- User and Job model validation
- Password hashing and JWT token generation
- Middleware validation (ObjectId, error handling)
- Authentication endpoints (register, login)

### Frontend Tests

The frontend uses **Vitest** and **React Testing Library** for testing.

**Test Structure:**
```
frontend/__tests__/
├── components/          # Component tests
├── pages/              # Page component tests
└── setup.js            # Test configuration
```

**Running Frontend Tests:**
```bash
cd frontend

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:**
- Component rendering and props
- User interactions (clicks, form submissions)
- Navigation and routing
- Protected route logic
- Conditional rendering

### Test Configuration Files

- **Backend:** `jest.config.js` - Jest configuration
- **Frontend:** `vitest.config.js` - Vitest configuration with jsdom

### Writing Tests

**Backend Example:**
```javascript
describe('User Model Tests', () => {
  it('should require email and password', async () => {
    const user = new User({});
    let err;
    try {
      await user.validate();
    } catch (error) {
      err = error;
    }
    expect(err.errors.email).toBeDefined();
  });
});
```

**Frontend Example:**
```javascript
describe('JobCard Component', () => {
  it('should render job information', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
  });
});
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```
This creates an optimized production build in the `dist` folder.

### Backend
The backend runs directly with Node.js. For production, consider using:
- PM2 for process management
- Environment variables for configuration
- Proper MongoDB Atlas setup
- HTTPS/SSL certificates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Bootstrap for the UI components
- MongoDB for the database solution
- Express.js community for excellent documentation
- React team for the amazing library

## Author

Ricardo Vega 2025
