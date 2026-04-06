# Centsibility Web Application

Frontend web application for the Centsibility Financial Management Platform.

## Technologies

- React 18.2
- Material-UI (MUI) 5.14
- React Router DOM 6.20
- Axios
- Formik
- Yup

## Project Structure

```
web/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── PrivateRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── authService.js
│   ├── css/
│   │   ├── Dashboard.css
│   │   ├── Login.css
│   │   └── Register.css
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .env
└── package.json
```

## Setup

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

3. Create a `.env` file with the following configuration:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

4. Start the development server:
```bash
npm start
```

The application will run at `http://localhost:3000`

## Features

### Authentication
- User registration with validation
- User login with JWT authentication
- Protected routes
- Automatic token management
- Session persistence

### User Registration
- Form fields: first name, last name, email, password, confirm password
- Password visibility toggle
- Real-time validation
- Password requirements: minimum 8 characters, uppercase, lowercase, digit, special character
- Duplicate email handling

### User Login
- Email and password authentication
- Form validation
- Error handling

### Dashboard
- User profile display
- Logout functionality
- Navigation

## Available Scripts

### `npm start`
Runs the application in development mode at http://localhost:3000

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the application for production to the `build` folder

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication

All API requests include automatic JWT token injection and centralized error handling.
