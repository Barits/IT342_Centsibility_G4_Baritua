# Authentication API Documentation

Base URL: `http://localhost:8080/api/auth`

## Endpoints

### 1. Register User

**POST** `/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+639123456789"
}
```

**Response:**
```json
{
  "message": "User registered successfully. Please check your email to verify your account."
}
```

### 2. Login

**POST** `/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "usernameOrEmail": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

### 3. Verify Email

**GET** `/verify-email?token={verificationToken}`

Verify user email address.

**Response:**
```json
{
  "message": "Email verified successfully!"
}
```

## Error Responses

**400 Bad Request:**
```json
{
  "status": 400,
  "message": "Username already exists",
  "error": "Bad Request",
  "timestamp": "2026-03-04T15:30:00"
}
```

**401 Unauthorized:**
```json
{
  "status": 401,
  "message": "Invalid username or password",
  "error": "Authentication Failed",
  "timestamp": "2026-03-04T15:30:00"
}
```
