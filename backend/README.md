# Centsibility Backend

REST API for the Centsibility Financial Management Platform.

## Technology Stack

- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT Authentication
- Spring Data JPA
- PostgreSQL / Supabase
- Maven
- Google OAuth 2.0

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/centsibility/
│   │   │   ├── config/            # Configuration classes
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/        # REST Controllers
│   │   │   │   └── AuthController.java
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   │   ├── request/
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   └── LoginRequest.java
│   │   │   │   └── response/
│   │   │   │       └── AuthResponse.java
│   │   │   ├── exception/         # Custom exceptions and handlers
│   │   │   │   ├── DuplicateEmailException.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── model/             # Entity classes
│   │   │   │   ├── User.java
│   │   │   │   └── Role.java
│   │   │   ├── repository/        # JPA Repositories
│   │   │   │   ├── UserRepository.java
│   │   │   │   └── RoleRepository.java
│   │   │   ├── security/          # Security components
│   │   │   │   ├── JwtUtils.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── UserDetailsServiceImpl.java
│   │   │   ├── service/           # Business logic
│   │   │   │   └── UserService.java
│   │   │   └── CentsibilityApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── schema.sql
│   └── test/                      # Test classes
└── pom.xml
```

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL database (local or Supabase)

### Environment Configuration

1. Copy `.env.example` to `.env` and configure the following variables:

```properties
DB_URL=jdbc:postgresql://your-host:5432/database
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secure_secret_key_minimum_64_characters
JWT_EXPIRATION=86400000
GOOGLE_CLIENT_ID=your_google_client_id
```

2. For Supabase: Use the Session Pooler connection string from Project Settings → Database
3. For Local PostgreSQL: Create database `centsibility` and run `schema-postgres.sql`

### Running the Application

```bash
mvn clean install
mvn spring-boot:run
```

Application runs on `http://localhost:8080`

## API Endpoints

### Authentication

**POST** `/api/auth/register`
```json
Request:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}

Response (201):
{
  "success": true,
  "data": { "id": 1, "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "role": "USER" },
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "timestamp": "2026-03-11T10:30:00"
}
```

**POST** `/api/auth/login`
```json
Request:
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "success": true,
  "data": { "id": 1, "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "role": "USER" },
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "timestamp": "2026-03-11T10:35:00"
}
```

**POST** `/api/auth/google/login`
```json
Request:
{ "token": "google_id_token_here" }

Response (200):
{
  "success": true,
  "data": { "id": 1, "firstName": "John", "lastName": "Doe", "email": "john.doe@gmail.com", "role": "USER" },
  "message": "Login successful via Google",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "timestamp": "2026-03-11T10:35:00"
}
```

**POST** `/api/auth/google/register`
```json
Request:
{ "token": "google_id_token_here" }

Response (201):
{
  "success": true,
  "data": { "id": 2, "firstName": "Jane", "lastName": "Smith", "email": "jane.smith@gmail.com", "role": "USER" },
  "message": "User registered successfully via Google",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "timestamp": "2026-03-11T10:40:00"
}
```

## Security

- Password Hashing: BCrypt with 12 rounds
- Authentication: JWT tokens with 24-hour expiration
- Google OAuth 2.0 integration with ID token verification
- CORS enabled (configure for production)
- Sensitive credentials stored in environment variables

## Features

**User Management**
- User registration with email and password
- User login with JWT token generation
- Google OAuth registration and login
- Email format and password strength validation
- Duplicate email prevention

**Security**
- JWT-based authentication
- BCrypt password encryption
- Google ID token verification
- Global exception handling
- Validation error responses

## Testing

```bash
mvn test
```

## Build

```bash
mvn clean package
```

JAR file output: `target/centsibility-backend-1.0.0.jar`
