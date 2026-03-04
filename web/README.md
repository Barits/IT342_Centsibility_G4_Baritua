# Centsibility Web Application

Frontend web application for the Centsibility Financial Management Platform built with React.

## Technologies Used

- **React 18.2**
- **Material-UI (MUI) 5.14**
- **React Router DOM 6.20**
- **Axios** (HTTP client)
- **Formik** (Form management)
- **Yup** (Form validation)

## Project Structure

```
web/
├── public/
│   └── index.html
├── src/
│   ├── components/           # Reusable components
│   │   └── PrivateRoute.jsx
│   ├── pages/                # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/             # API services
│   │   ├── api.js
│   │   └── authService.js
│   ├── App.jsx               # Main app component
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the web directory with:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Features Implemented (Phase 1)

### User Registration Page
- ✅ First name, last name, email, and password fields
- ✅ Password confirmation field
- ✅ Show/hide password toggle
- ✅ Client-side validation with real-time feedback
- ✅ Password strength requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one digit
  - At least one special character (@#$%^&+=!)
- ✅ Duplicate email error handling
- ✅ Success message and automatic redirect to login
- ✅ Loading state during submission

### User Login Page
- ✅ Email and password fields
- ✅ Show/hide password toggle
- ✅ Client-side validation
- ✅ Error handling for invalid credentials
- ✅ JWT token storage
- ✅ Automatic redirect to dashboard on success
- ✅ Loading state during submission

### Dashboard
- ✅ Protected route (requires authentication)
- ✅ Display user information
- ✅ Logout functionality
- ✅ Navigation bar

### Security & Authentication
- ✅ JWT token-based authentication
- ✅ Automatic token inclusion in API requests
- ✅ Automatic redirect to login on 401 errors
- ✅ Protected routes with authentication check
- ✅ Local storage for user data and token

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## Form Validation Rules

### Registration Form
- **First Name:** Required, 2-50 characters
- **Last Name:** Required, 2-50 characters
- **Email:** Required, valid email format
- **Password:** Required, minimum 8 characters with complexity requirements
- **Confirm Password:** Required, must match password

### Login Form
- **Email:** Required, valid email format
- **Password:** Required

## API Integration

The frontend communicates with the backend API through the following endpoints:

- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`

All API calls are made through the centralized `api.js` service with automatic token injection and error handling.

## Styling

- Material-UI components for consistent design
- Responsive layout with MUI Grid and Container
- Custom theme configuration
- Clean and modern UI

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Email verification
- Password reset functionality
- Remember me option
- Multi-factor authentication
- Social login integration
