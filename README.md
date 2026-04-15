# Centsibility - Financial Management Platform

Centsibility is a financial management platform built with Spring Boot and React. It now includes authenticated finance flows for transactions, analytics, and month-based budget planning.

## Features

- Secure user authentication and authorization with JWT
- Role-based access control
- Password encryption with BCrypt
- Transactions management and category-based expense tracking
- Analytics and dashboard summaries
- Month-based budget plans (current month up to 2 months ahead)
- Protected routes and responsive Material UI interface

## Project Structure

```
IT342_Centsibility_G4_Baritua/
├── backend/          # Spring Boot REST API
├── web/              # React web application
├── mobile/           # Reserved for a future mobile app
├── documents/        # Project documentation
└── README.md         # This file
```

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Security**: Spring Security with JWT
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **Validation**: Jakarta Bean Validation

### Frontend
- **Framework**: React 18.2
- **UI Library**: Material-UI 5.14
- **Routing**: React Router DOM 6.20
- **HTTP Client**: Axios
- **Form Management**: Formik
- **Form Validation**: Yup

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- PostgreSQL 14 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure database in `src/main/resources/application.properties` with your PostgreSQL connection values.

3. Create database and run schema:
```bash
psql -U your_username -d centsibility -f src/main/resources/schema-postgres.sql
```

4. Start the backend:
```bash
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

4. Start the frontend:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "USER"
  },
  "message": "User registered successfully",
  "timestamp": "2026-03-04T10:30:00"
}
```

#### POST /api/auth/login
Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

### Budgets

#### GET /api/budgets?month=YYYY-MM
Fetch budget summary and month spending details for the selected month.

#### GET /api/budgets/plans
Fetch saved month budget plans for the authenticated user.

#### POST /api/budgets/plans
Create or update a monthly budget plan.

**Request Body:**
```json
{
  "month": "2026-04",
  "amount": 7000
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "USER"
  },
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "timestamp": "2026-03-04T10:35:00"
}
```

## Database Schema (Phase 1)

The database consists of three main tables:
- **users**: User account information
- **roles**: User roles (USER, ADMIN)
- **user_roles**: Junction table for many-to-many relationship

Security features include BCrypt password hashing (12 salt rounds), email uniqueness constraints, and automatic timestamping.

## Architecture

- **Controller Layer**: Handles HTTP requests, input validation, and response formatting
- **Service Layer**: Contains business logic and transaction management
- **Repository Layer**: Manages database operations through Spring Data JPA
- **DTO Layer**: Transfers data between layers without exposing internal entities
- **Security Layer**: JWT authentication and role-based access control

This layered architecture keeps the codebase separated by responsibility and easier to maintain.

Security notes:
- **Password Hashing**: BCrypt with 12 salt rounds
- **Authentication**: JWT tokens (24-hour expiration)
- **Input Validation**: Client-side and server-side
- **SQL Injection Protection**: JPA/Hibernate parameterized queries
- **XSS Protection**: React default behavior
- **CORS**: Configured for development (needs production adjustment)

## Build for Production

### Backend
```bash
cd backend
mvn clean package
# JAR file created in target/ directory
```

### Frontend
```bash
cd web
npm run build
# Optimized build created in build/ directory
```

## Contributors

**Section G4 - Baritua**  
IT342 Project - March 2026

## License

This project is developed for educational purposes as part of IT342 course.

## Support

For questions or issues, please contact the development team or create an issue in the repository.

## Security

- Never commit real database credentials or JWT secrets.
- Keep CORS restricted when moving beyond development.
- Use strong passwords and BCrypt hashing for all user credentials.

---

**Last Updated:** April 6, 2026  
**Version:** 1.0.0 (Phase 1 Complete)  
**Status:** ✅ User Registration and Login Implemented

## Documentation

Comprehensive documentation is available in the `/documents` directory:

- **[Backend README](backend/README.md)** - Backend setup and API documentation
- **[Frontend README](web/README.md)** - Frontend setup and component documentation
- **[Database Schema](backend/src/main/resources/schema-postgres.sql)** - Complete database structure