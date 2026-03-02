# Centsibility

Centsibility is a mobile-first financial management platform designed to simplify personal accounting for students and young professionals. It provides users with real-time visibility into their spending habits through intuitive transaction logging and financial dashboards.

## ⚠️ IT342 Course Requirements

**ALL features in this project are MANDATORY per IT342 final requirements.** This includes:
- ✅ Authentication & Security
- ✅ Role-Based Access Control  
- ✅ Core Business Module (Transaction CRUD)
- ✅ Google OAuth Login (REQUIRED)
- ✅ File Upload (REQUIRED)
- ✅ Email Sending via SMTP (REQUIRED)
- ✅ External API Integration (REQUIRED)
- ✅ Payment Gateway (if applicable)

📋 **See [IT342_REQUIREMENTS_SUMMARY.md](documents/IT342_REQUIREMENTS_SUMMARY.md) for complete requirements breakdown and implementation roadmap.**

## Project Overview

Many individuals face financial anxiety due to a lack of visibility into their spending habits. Traditional methods like spreadsheets or physical receipts are time-consuming and error-prone. Centsibility bridges the gap between complex banking apps and manual trackers, offering a structured environment where users can instantly log income and expenses, categorize transactions, and view their financial health at a glance.

> 📊 **Development Status**: For current development progress, implementation status, and weekly updates, see [PROJECT_STATUS.md](documents/PROJECT_STATUS.md)

## Technology Stack

- **Backend**: Spring Boot, Spring Security, JWT, BCrypt
- **Database**: MySQL with Hibernate ORM
- **Frontend**: React (Web), React Native (Mobile)
- **Integration**: External REST APIs, Google OAuth 2.0, Payment Gateway (Sandbox), SMTP Email
- **Architecture**: Layered Architecture (Controller-Service-Repository)

## Features

### Authentication & Security
- User registration and login with password hashing (BCrypt)
- JWT-based authentication for secure API access
- Logout functionality and protected routes
- `/me` endpoint to retrieve current authenticated user

### Role-Based Access Control
- Two user roles: Admin and Regular User
- API-level restrictions based on user roles
- UI-level access control for different features
- Admins can manage system data; regular users have limited access

### Core Business Module: Transaction Management
- Full CRUD operations for income and expense records
- Transaction categorization (Food, Rent, Salary, etc.)
- Proper validation for all input data
- Automatic timestamping for accurate record-keeping

### System Integrations (ALL REQUIRED FOR IT342)
- **External API** (REQUIRED): Consumes real public API for financial data enrichment
- **Google OAuth Login** (REQUIRED): Social login with automatic user registration and JWT generation
- **File Upload** (REQUIRED): Upload and store receipts (images/PDFs) linked to transactions
- **Payment Gateway** (if applicable): Sandbox integration with real payment provider; records success/failure
- **Email Notifications** (REQUIRED): Account verification emails and system notifications via SMTP (no console print)

### Database Design (IT342 Requirement: Minimum 5 Tables)
- Six normalized tables with proper relationships (users, roles, user_roles, transactions, files, email_logs)
- One-to-Many and Many-to-One relationships
- Secure password storage with BCrypt hashing (no plain-text)
- DTO pattern to prevent sensitive data exposure in API responses

### Architecture
- Clear layered architecture (Controller, Service, Repository)
- Global exception handling for consistent error responses
- RESTful endpoint naming conventions
- Proper HTTP status codes for all responses

## Getting Started

### Prerequisites
- Java 17 or higher
- MySQL 8.0
- Node.js and npm (for web/mobile clients)
- SMTP server credentials for email functionality

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/IT342_Centsibility_Baritua.git
cd IT342_Centsibility_Baritua
```

2. Configure the database
```bash
# Create MySQL database
CREATE DATABASE centsibility;
```

3. Set up environment variables
```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Update the following variables:
# - Database credentials
# - Google OAuth credentials
# - Payment gateway keys
# - SMTP configuration
```

4. Run the backend application
```bash
cd backend
./mvnw spring-boot:run
```

5. Run the web client
```bash
cd web
npm install
npm start
```

## API Documentation
The API follows RESTful conventions with proper HTTP status codes:

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | User registration | Public |
| POST | /api/auth/login | User login | Public |
| GET | /api/users/me | Get current user | Authenticated |
| GET | /api/transactions | List transactions | Authenticated |
| POST | /api/transactions | Create transaction | Authenticated |
| PUT | /api/transactions/{id} | Update transaction | Authenticated |
| DELETE | /api/transactions/{id} | Delete transaction | Authenticated |
| GET | /api/admin/users | List all users | Admin only |

## Project Structure

**Note:** IT342 requires folders named `backend/`, `web/`, `mobile/`, and `docs/`. We currently have `documents/` instead of `docs/` - consider renaming if needed.

```
IT342_Centsibility_G4_Baritua/
├── backend/           # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/centsibility/
│   │   │   │   ├── controller/    # REST controllers
│   │   │   │   ├── service/       # Business logic
│   │   │   │   ├── repository/    # Data access
│   │   │   │   ├── dto/           # Data transfer objects
│   │   │   │   ├── model/         # Entity classes (6 tables)
│   │   │   │   ├── config/        # Security configuration
│   │   │   │   └── exception/     # Global exception handling
│   │   │   └── resources/         # Application properties
│   │   └── test/                  # Unit and integration tests
├── web/               # React web application
├── mobile/            # React Native mobile application
├── documents/         # Documentation and diagrams (should be "docs/"?)
│   ├── IT342_REQUIREMENTS_SUMMARY.md  # ⭐ START HERE
│   ├── SYSTEM_DESIGN_DOCUMENT.md      # Complete system spec
│   ├── PROJECT_STATUS.md              # Current progress
│   ├── SETUP_GUIDE.md                 # Installation guide
│   └── PACKAGE_STRUCTURE.md           # Architecture details
└── README.md
```

## Architecture
The application implements a layered architecture pattern:

- **Controller Layer**: Handles HTTP requests, input validation, and response formatting
- **Service Layer**: Contains business logic and transaction management
- **Repository Layer**: Manages database operations through Spring Data JPA
- **DTO Layer**: Transfers data between layers without exposing internal entities
- **Security Layer**: Configures JWT authentication and role-based access control

The architecture ensures separation of concerns, maintainability, and testability.

## Documentation
Comprehensive documentation is available in the `/documents` directory:

- **[System Design Document (SDD)](documents/SYSTEM_DESIGN_DOCUMENT.md)** - Complete system specification, requirements, API contracts, database design, and project timeline
- **[Project Status](documents/PROJECT_STATUS.md)** - Current development progress and phase tracking
- **[Setup Guide](documents/SETUP_GUIDE.md)** - Installation instructions and troubleshooting
- **[Package Structure](documents/PACKAGE_STRUCTURE.md)** - Backend architecture and code organization
- Architecture diagrams (planned)
- API specifications (in SDD)
- Database schema (in SDD)

## Contributors
Baritua - Project Lead & Developer