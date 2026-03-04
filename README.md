# Centsibility - Financial Management Platform

Centsibility is a comprehensive financial management platform built with Spring Boot, React, and MySQL. It simplifies personal accounting for students and young professionals by providing real-time visibility into spending habits through intuitive transaction logging and financial dashboards.

## Features

- Secure user authentication and authorization with JWT
- Role-based access control
- Password encryption with BCrypt
- Real-time form validation
- Protected routes and personalized dashboard
- Responsive Material-UI interface

## Project Structure

```
IT342_Centsibility_G4_Baritua/
├── backend/          # Spring Boot REST API
├── web/              # React web application
├── mobile/           # Mobile application (Future)
├── documents/        # Project documentation
└── README.md         # This file
```

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Security**: Spring Security with JWT
- **Database**: MySQL 8.0
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
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure database in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/centsibility
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Create database and run schema:
```bash
mysql -u your_username -p < src/main/resources/schema.sql
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

## Architectureayered architecture:

- **Controller Layer**: Handles HTTP requests, input validation, and response formatting
- **Service Layer**: Contains business logic and transaction management
- **Repository Layer**: Manages database operations through Spring Data JPA
- **DTO Layer**: Transfers data between layers without exposing internal entities
- **Security Layer**: JWT authentication and role-based access control

This*Password Hashing**: BCrypt with 12 salt rounds
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

**Group 4 - Baritua**  
IT342 Project - March 2026

## License

This project is developed for educational purposes as part of IT342 course.

## Support

For  architecture ensures separation of concerns, maintainability, and testability.

## Security

- *questions or issues, please contact the development team or create an issue in the repository.

---

**Last Updated:** March 4, 2026  
**Version:** 1.0.0 (Phase 1 Complete)  
**Status:** ✅ User Registration and Login Implemented## Documentation

Comprehensive documentation is available in the `/documents` directory:

- **[Backend README](backend/README.md)** - Backend setup and API documentation
- **[Frontend README](web/README.md)** - Frontend setup and component documentation
- **[Database Schema](backend/src/main/resources/schema.sql)** - Complete database structure

## License

This project is developed for educational purposes as part of IT342 course.Documentation

Comprehensive documentation is available in the `/documents` directory:

- **[Backend README](backend/README.md)** - Backend setup and API documentation
- **[Frontend README](web/README.md)** - Frontend setup and component documentation
- **[Database Schema](backend/src/main/resources/schema.sql)** - Complete database structure

## Contributors

**Section G4 - Baritua**  
IT342 Project