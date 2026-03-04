# Centsibility API Documentation

## Overview

This directory contains API documentation for the Centsibility platform.

## API Endpoints

### Authentication
- [Authentication API](./authentication.md) - User registration, login, and email verification

### Transactions
- [Transactions API](./transactions.md) - Transaction management (CRUD operations)

### Budgets
- [Budgets API](./budgets.md) - Budget management and tracking

### Users
- User profile management
- Admin user operations

### Files
- File upload and download
- Receipt management

## Authentication

Most API endpoints require authentication using JWT Bearer tokens.

Include the token in the Authorization header:
```
Authorization: Bearer {your_token_here}
```

## Base URL

Development: `http://localhost:8080/api`

## Response Format

### Success Response
```json
{
  "data": {},
  "message": "Success"
}
```

### Error Response
```json
{
  "status": 400,
  "message": "Error message",
  "error": "Bad Request",
  "timestamp": "2026-03-04T15:30:00",
  "path": "/api/endpoint"
}
```

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
