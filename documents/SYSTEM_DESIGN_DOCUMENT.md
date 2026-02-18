# IT342-[Section]
**System Integration and Architecture**

# System Design Document (SDD)

**Project Title**: Centsibility  
**Prepared By**: Baritua

**Version**: 1.0 (IT342 Final Requirements)  
**Date**: February 18, 2026  
**Status**: Final - All Listed Features Are Mandatory

**IMPORTANT**: This document reflects the MANDATORY IT342 course requirements. All integration features (Google OAuth, File Upload, External API, Email SMTP) are REQUIRED and must be working for Final Defense. No features marked as optional.

---

## REVISION HISTORY TABLE

| Version | Date | Author | Changes Made | Status |
|---------|------|--------|--------------|--------|
| 0.1 | Feb 18, 2026 | Baritua | Initial draft | Draft |
| 0.2 | TBD | Baritua | Added API specifications | Review |
| 0.3 | TBD | Baritua | Updated database design | Review |
| 0.4 | TBD | Baritua | Added UI/UX designs | Review |
| 0.5 | TBD | Baritua | Incorporated feedback | Revised |
| 0.6 | TBD | Baritua | Final review and corrections | Final |
| 1.0 | TBD | Baritua | Baseline version for development | Approved |

---

## TABLE OF CONTENTS

- [EXECUTIVE SUMMARY](#executive-summary)
- [1.0 INTRODUCTION](#10-introduction)
- [2.0 FUNCTIONAL REQUIREMENTS SPECIFICATION](#20-functional-requirements-specification)
- [3.0 NON-FUNCTIONAL REQUIREMENTS](#30-non-functional-requirements)
- [4.0 SYSTEM ARCHITECTURE](#40-system-architecture)
- [5.0 API CONTRACT & COMMUNICATION](#50-api-contract--communication)
- [6.0 DATABASE DESIGN](#60-database-design)
- [7.0 UI/UX DESIGN](#70-uiux-design)
- [8.0 PLAN](#80-plan)

---

## EXECUTIVE SUMMARY

### 1.1 Project Overview

Centsibility is a mobile-first financial management platform designed to simplify personal accounting for students and young professionals. The system enables users to track income and expenses in real-time through intuitive transaction logging and financial dashboards. It includes a Spring Boot backend API, React web application, and React Native mobile app, all integrated to provide seamless financial tracking across platforms.

### 1.2 Objectives

- Develop a fully functional financial management platform with authentication, transaction management, and financial reporting
- Implement a layered architecture using Spring Boot (backend), React (web), and React Native (mobile)
- Create RESTful APIs with JWT authentication for secure communication between components
- Design a responsive user interface that works consistently across web and mobile platforms
- Integrate external services (Google OAuth, SMTP email, payment gateway sandbox)
- Deploy all system components to production-ready environments

### 1.3 Scope

**ALL FEATURES BELOW ARE MANDATORY (IT342 Requirements)**:

**1. Authentication & Security (REQUIRED)**:
- User registration and login
- JWT authentication  
- Logout functionality
- Password hashing (BCrypt)
- Protected routes/pages
- /me endpoint (get current authenticated user)

**2. Role-Based Access Control (REQUIRED)**:
- Minimum 2 user roles (Admin, User)
- API-level role restrictions
- UI-level role-based rendering

**3. Core Business Module (REQUIRED)**:
- Transaction entity (primary business entity - not User)
- Full CRUD operations for transactions
- Proper input validation
- Transaction categorization

**4. System Integration Features (ALL REQUIRED FOR FINAL DEFENSE)**:
- ✅ **External API Integration** - Consume real public financial/currency API
- ✅ **Google OAuth Login** - Social login with JWT generation after OAuth
- ✅ **File Upload** - Upload receipts (image/PDF), store on server, link to database
- ✅ **Email Sending (SMTP)** - Welcome email + transaction notifications (no console print)
- ❓ **Payment Gateway** - Sandbox mode (only if applicable to domain)
- 🎁 **Real-Time Feature** - WebSocket or polling (Optional Bonus)

**5. Database Requirements (REQUIRED)**:
- Minimum 5 database tables
- Proper relationships (One-to-Many, Many-to-One)
- No plain-text passwords
- Proper normalization
- Use DTOs (no password in API responses)

**6. Architecture Requirements (REQUIRED)**:
- Layered Architecture pattern
- Controller-Service-Repository layers
- DTOs for data transfer
- Security configuration
- Global exception handling
- Architecture diagram in documentation

**7. Repository Structure (REQUIRED)**:
- IT342_<AppName>_<Section>_<Lastname> format
- backend/, web/, mobile/, docs/ folders

---

## 1.0 INTRODUCTION

### 1.1 Purpose

This document serves as the comprehensive design specification for the Centsibility financial management system. It provides detailed requirements, architectural decisions, API contracts, database design, and implementation roadmap to guide development and ensure all components integrate seamlessly.

### 1.2 Target Audience

- **Development Team**: Implementation guidance
- **Project Stakeholders**: Progress tracking and feature validation
- **Quality Assurance**: Testing requirements and acceptance criteria
- **System Administrators**: Deployment and configuration reference

---

## 2.0 FUNCTIONAL REQUIREMENTS SPECIFICATION

### 2.1 Project Overview

**Project Name**: Centsibility  
**Domain**: Financial Management / Personal Finance  
**Primary Users**: Students, Young Professionals, Administrators  
**Problem Statement**: Many individuals face financial anxiety due to a lack of visibility into their spending habits. Traditional methods like spreadsheets or physical receipts are time-consuming and error-prone.  
**Solution**: A mobile-first platform that bridges the gap between complex banking apps and manual trackers, offering a structured environment where users can instantly log income and expenses, categorize transactions, and view their financial health at a glance.

### 2.2 Core User Journeys

**Journey 1: First-time User Registration and First Transaction**
1. User visits web/mobile application
2. Clicks "Sign Up" and creates account with email/password
3. Receives verification email
4. Verifies email and logs in
5. Navigates to "Add Transaction"
6. Selects transaction type (Income/Expense)
7. Enters amount, category, and description
8. Optionally uploads receipt
9. Saves transaction
10. Views transaction in dashboard

**Journey 2: Regular User - Expense Tracking**
1. User logs in with existing credentials
2. Views dashboard showing current month's summary
3. Clicks "Add Expense"
4. Quick-adds expense with amount and category
5. Takes photo of receipt and attaches
6. Views updated spending by category
7. Reviews weekly spending trends
8. Logs out

**Journey 3: Google OAuth Login**
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. Grants permissions
4. Automatically registered and logged in
5. JWT token generated and stored
6. Redirected to dashboard

**Journey 4: Administrator User Management**
1. Admin logs in with admin credentials
2. Navigates to admin dashboard
3. Views list of all users
4. Reviews user transaction activity
5. Can disable/enable user accounts
6. Views system-wide statistics

### 2.3 Feature List (IT342 Final Requirements - ALL MANDATORY)

**TIER 1: Core Authentication & Authorization (REQUIRED)**
- ✅ User registration and login (email/password)
- ✅ JWT authentication with token expiration
- ✅ Logout functionality
- ✅ Password hashing with BCrypt
- ✅ Protected routes/pages
- ✅ /me endpoint (get current authenticated user)
- ✅ Role-based access control (Admin + User roles minimum)
- ✅ API-level role restrictions (@PreAuthorize)
- ✅ UI-level role-based rendering

**TIER 1: Core Business Module - Transactions (REQUIRED)**
- ✅ Transaction CRUD operations (create, read, update, delete)
- ✅ Transaction categorization (Income/Expense types)
- ✅ Input validation for all fields
- ✅ Transaction list view with pagination
- ✅ User can only see their own transactions
- ✅ Proper timestamps (created_at, updated_at)

**TIER 2: Required Integration Features (ALL MANDATORY FOR FINAL DEFENSE)**
- ✅ **External API Integration** - Consume real public API (e.g., currency exchange rates, financial news)
- ✅ **Google OAuth Login** - Social login with JWT generation after OAuth success
- ✅ **File Upload** - Upload receipt images/PDFs, store on server, link to database records
- ✅ **Email Sending (SMTP)** - Welcome email on registration + transaction notification emails
- ❓ **Payment Gateway** - Sandbox integration (only if domain-applicable, e.g., premium features)
- 🎁 **Real-Time Feature** - WebSocket or polling for live updates (Optional Bonus)

**TIER 3: Additional Required Features**
- ✅ Admin panel for user management
- ✅ Transaction filtering by date and category
- ✅ User profile management
- ✅ Responsive web design
- ✅ Mobile application (React Native)

**OUT OF SCOPE (Not Required)**
- ❌ Bank account synchronization
- ❌ Advanced AI/ML analytics
- ❌ Multi-currency with real-time conversion
- ❌ Recurring/scheduled transactions
- ❌ Export to Excel/PDF (nice to have but not mandatory)

### 2.4 Detailed Feature Specifications

**Feature: User Authentication**
- **Screens**: Registration, Login, Email Verification, Forgot Password
- **Fields**: Email, Password, Confirm Password, First Name, Last Name
- **Validation**: 
  - Email format and uniqueness
  - Password strength (min 8 characters, uppercase, lowercase, number)
  - Password match confirmation
- **API Endpoints**: 
  - `POST /api/auth/register` ✅ REQUIRED
  - `POST /api/auth/login` ✅ REQUIRED
  - `POST /api/auth/logout` ✅ REQUIRED
  - `GET /api/auth/me` ✅ REQUIRED
  - `POST /api/auth/google` ✅ REQUIRED (OAuth integration)
  - `POST /api/auth/verify-email?token={token}` (if implementing email verification)
- **Security**: 
  - JWT tokens with expiration
  - BCrypt password hashing (12 salt rounds)
  - Email verification required
  - Refresh token rotation

**Feature: Transaction Management**
- **Screens**: Transaction List, Add Transaction, Edit Transaction, Transaction Detail
- **Display**: List view with filters, category icons, color coding (green=income, red=expense)
- **Fields**: Amount, Type (Income/Expense), Category, Description, Date, Receipt
- **Validation**:
  - Amount must be positive
  - Category must be valid enum
  - Description max 500 characters
- **API Endpoints**:✅ REQUIRED - List transactions with pagination
  - `GET /api/transactions/{id}` ✅ REQUIRED - Get transaction details
  - `POST /api/transactions` ✅ REQUIRED - Create transaction
  - `PUT /api/transactions/{id}` ✅ REQUIRED - Update transaction
  - `DELETE /api/transactions/{id}` ✅ REQUIRED - Delete transaction
  - `POST /api/transactions/{id}/upload-receipt` ✅ REQUIRED - Upload receipt file
  - `DELETE /api/transactions/{id}` - Delete transaction
- **Business Rules**:
  - Users can only view/edit their own transactions
  - Timestamps automatically managed
  - Soft delete option for audit trail

**Feature: Transaction Categories**
- **Income Categories**: Salary, Freelance, Investment, Gift, Other Income
- **Expense Categories**: Food, Rent, Utilities, Transport, Entertainment, Healthcare, Education, Shopping, Other Expense
- **Implementation**: Enum in Transaction entity
- **Display**: Icon and color-coded for quick recognition

**Feature: File Upload (Receipts)**
- **Screens**: Transaction Form with upload widget
- **Supported Formats**: JPG, PNG, PDF
- **Max Size**: 10MB per file
- **Storage**: Server filesystem or cloud storage
- **API Endpoint**: `POST /api/transactions/{id}/receipt`
- **Validation**: File type, size, virus scanning (optional)

**Feature: Financial Dashboard**
- **Screens**: Home Dashboard
- **Metrics**:
  - Total income (current month)
  - Total expenses (current month)
  - Net balance
  - Top spending categories
  - Recent transactions
- **Visualizations**: 
  - Bar chart for spending by category
  - Line chart for daily spending trend
  - Pie chart for category distribution
- **API Endpoint**: `GET /api/transactions/summary`

**Feature: Admin Panel**
- **Screens**: Admin Dashboard, User Management, Transaction Oversight
- **Functions**: 
  - View all users
  - Disable/enable accounts
  - View all transactions (read-only)
  - System statistics
- **Access Control**: Admin role required (`ROLE_ADMIN`)
- **API Endpoints**:
  - `GET /api/admin/users` - List all users
  - `GET /api/admin/transactions` - View all transactions
  - `DELETE /api/admin/users/{id}` - Delete user

**Feature: Email Notifications**
- **Triggers**:
  - Account registration (verification email)
  - Password reset request
  - Large transaction alert (optional)
- **Provider**: SMTP (Gmail, SendGrid, etc.)
- **Configuration**: application.properties with SMTP settings
- **Templates**: HTML email templates

**Feature: Google OAuth Login**
- **Flow**: OAuth 2.0 authorization code flow
- **Scopes**: profile, email
- **Implementation**: Spring Security OAuth2 Client
- **User Creation**: Auto-create user on first login
- **API Endpoint**: `POST /api/auth/google`

### 2.5 Acceptance Criteria

**AC-1: Successful User Registration**
```gherkin
Given I am a new user
When I enter valid email "user@example.com"
And I enter a strong password "SecurePass123"
And I confirm the password matches
And I enter first name "John" and last name "Doe"
And I click "Create Account"
Then my account should be created
And I should receive a verification email
And I should see a message "Please verify your email"
```

**AC-2: Transaction Creation and Viewing**
```gherkin
Given I am logged in as a customer
When I click "Add Transaction"
And I select type "Expense"
And I enter amount "50.00"
And I select category "Food"
And I enter description "Grocery shopping"
And I select today's date
And I click "Save Transaction"
Then I should see a success message
And the transaction should appear in my transaction list
And my dashboard should reflect the new expense
```

**AC-3: Admin User Management**
```gherkin
Given I am logged in as an administrator
When I navigate to "User Management"
Then I should see a list of all users
And I should see their registration dates
And I should see their transaction counts
When I click "View Details" on a user
Then I should see their profile information
And I should see their recent transactions
```

**AC-4: Google OAuth Login**
```gherkin
Given I am on the login page
When I click "Continue with Google"
And I grant permissions on Google consent screen
And Google authentication succeeds
Then I should be automatically logged in
And redirected to the dashboard
And a JWT token should be stored
And if it's my first login, a user account should be created
```

---

## 3.0 NON-FUNCTIONAL REQUIREMENTS

### 3.1 Performance Requirements

- **API Response Time**: ≤ 2 seconds for 95% of requests
- **Database Query Time**: ≤ 500ms for complex queries
- **Web Page Load Time**: ≤ 3 seconds on broadband connection
- **Mobile App Cold Start**: ≤ 3 seconds
- **Concurrent Users**: Support 100 concurrent users
- **Transaction Processing**: Handle 1000 transactions per day
- **File Upload**: Complete within 5 seconds for 5MB file

### 3.2 Security Requirements

- **Transport Security**: HTTPS/TLS 1.3 for all communications
- **Authentication**: JWT with 24-hour expiration, refresh tokens with 7-day expiration
- **Password Security**: BCrypt hashing with 12 salt rounds
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Prevention**: Use parameterized queries (JPA)
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Rate Limiting**: 100 requests per minute per IP
- **Role-Based Access**: Enforce role checks at API level
- **Data Privacy**: No plain-text password storage, DTO pattern to exclude sensitive data

### 3.3 Compatibility Requirements

**Web Browsers**:
- Chrome 100+ (latest 2 versions)
- Firefox 100+ (latest 2 versions)
- Safari 14+ (latest 2 versions)
- Edge 100+ (latest 2 versions)

**Mobile Platforms**:
- Android: API Level 24+ (Android 7.0+)
- iOS: iOS 13+ (for React Native)

**Screen Sizes**:
- Mobile: 360px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Operating Systems**:
- Windows 10+
- macOS 10.15+
- Linux Ubuntu 20.04+

**Database**:
- MySQL 8.0+

### 3.4 Usability Requirements

- **Learning Curve**: New users should complete first transaction within 3 minutes
- **Navigation**: Maximum 3 clicks to reach any feature
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Error Messages**: Clear, actionable error messages with recovery suggestions
- **Touch Targets**: Minimum 44x44px on mobile devices
- **Keyboard Navigation**: Full keyboard support for web application
- **Form Validation**: Real-time feedback on form fields
- **Loading Indicators**: Visual feedback for all async operations
- **Responsive Design**: Consistent experience across all device sizes

### 3.5 Reliability Requirements

- **Uptime**: 99% availability during business hours
- **Data Backup**: Daily automated backups
- **Error Recovery**: Graceful degradation on service failures
- **Data Integrity**: Transaction atomicity for financial operations
- **Audit Trail**: Log all data modifications with timestamps

### 3.6 Maintainability Requirements

- **Code Documentation**: JavaDoc for all public methods
- **Logging**: Comprehensive logging with appropriate levels (DEBUG, INFO, WARN, ERROR)
- **Modular Design**: Clear separation of concerns (Controller-Service-Repository)
- **Version Control**: Git with feature branch workflow
- **Dependency Management**: Maven for backend, npm for frontend
- **Configuration**: Externalized configuration in application.properties

---

## 4.0 SYSTEM ARCHITECTURE

### 4.1 Component Diagram

```
┌─────────────────┐    ┌─────────────────┐
│   WEB CLIENT    │    │  MOBILE CLIENT  │
│    (React)      │    │  (React Native) │
│   • JavaScript  │    │   • JavaScript  │
│   • React 19    │    │   • RN Latest   │
│   • Axios       │    │   • Fetch API   │
└────────┬────────┘    └────────┬────────┘
         │                      │
         └──────────┬───────────┘
                    │
         ┌──────────▼──────────┐
         │   BACKEND API       │
         │   (Spring Boot)     │
         │   • Java 17         │
         │   • Spring Security │
         │   • JWT Auth        │
         │   • JPA/Hibernate   │
         │   • RESTful API     │
         └─────────┬───────────┘
                   │
         ┌─────────▼───────────┐
         │   DATABASE          │
         │   (MySQL 8.0)       │
         │   • users           │
         │   • roles           │
         │   • user_roles      │
         │   • transactions    │
         │   • refresh_tokens  │
         └─────────────────────┘

         External Integrations:
         ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
         │ Google OAuth │  │   SMTP Mail  │  │ Payment API  │
         └──────────────┘  └──────────────┘  └──────────────┘
```

### 4.2 Technology Stack

**Backend**:
- Java 17
- Spring Boot 3.2.2
- Spring Security (JWT authentication)
- Spring Data JPA (ORM)
- Hibernate (database abstraction)
- MySQL Connector
- Maven (build tool)
- BCrypt (password hashing)
- JWT Library (io.jsonwebtoken 0.12.3)
- OAuth2 Client (Google login)
- JavaMail (SMTP)

**Web Frontend**:
- React 19.2.4
- JavaScript/ES6+
- Axios (HTTP client)
- React Router (navigation)
- CSS/Tailwind (styling)
- Webpack (bundler via Create React App)

**Mobile Frontend**:
- React Native (latest)
- JavaScript/ES6+
- React Navigation
- AsyncStorage (local storage)
- Fetch API (HTTP client)

**Database**:
- MySQL 8.0+
- InnoDB engine
- UTF-8 character set

**Development Tools**:
- Git (version control)
- VS Code / IntelliJ IDEA (IDEs)
- Postman (API testing)
- MySQL Workbench (database management)

**Deployment** (Planned):
- Backend: Railway, Heroku, or AWS
- Web: Vercel, Netlify
- Mobile: APK distribution, Google Play (future)

### 4.3 Architectural Pattern

**Layered Architecture** (3-tier):

1. **Presentation Layer** (Controllers)
   - Handle HTTP requests/responses
   - Input validation
   - DTO transformation
   - Exception handling

2. **Business Logic Layer** (Services)
   - Implement business rules
   - Transaction management
   - Data processing
   - Service orchestration

3. **Data Access Layer** (Repositories)
   - Database operations
   - Query abstraction
   - Entity management

### 4.4 Security Architecture

**Authentication Flow**:
```
1. User submits credentials → AuthController
2. UserService validates credentials
3. JWT token generated with user claims
4. Token returned to client
5. Client stores token (localStorage/AsyncStorage)
6. Subsequent requests include token in Authorization header
7. JWT filter validates token
8. SecurityContext populated with user details
9. Request processed if authorized
```

**Authorization**:
- Role-based access control (RBAC)
- Admin and User roles
- Method-level security with `@PreAuthorize`
- API endpoint protection based on roles

---

## 5.0 API CONTRACT & COMMUNICATION

### 5.1 API Standards

**Base URL**: `https://api.centsibility.com/api` (or `http://localhost:8080/api` for development)

**Format**: JSON for all requests and responses

**Authentication**: Bearer token (JWT) in Authorization header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Standard Response Structure**:
```json
{
  "success": true,
  "data": {
    ...
  },
  "message": "Operation successful",
  "timestamp": "2026-02-18T10:30:00Z"
}
```

**Error Response Structure**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  },
  "timestamp": "2026-02-18T10:30:00Z"
}
```

### 5.2 Endpoint Specifications (MVP Core Only)

**Note**: Start with these core endpoints. Additional endpoints can be added as needs are identified.

#### Authentication Endpoints

**POST /api/auth/register**
- **Description**: Register a new user account
- **Authentication**: None (public)
- **Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```
- **Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "enabled": false
    },
    "message": "Registration successful. Please verify your email."
  }
}
```
- **Validation**:
  - Email must be valid format and unique
  - Password minimum 8 characters
  - Passwords must match
  - All fields required

**POST /api/auth/login**
- **Description**: Authenticate user and receive JWT token
- **Authentication**: None (public)
- **Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "roles": ["ROLE_USER"]
    }
  }
}
```

**POST /api/auth/logout**
- **Description**: Logout user and invalidate token
- **Authentication**: Required
- **Headers**: `Authorization: Bearer {token}`
- **Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**GET /api/auth/verify** _(Phase 2 - Optional)_
- Email verification can be added later if needed

**POST /api/auth/google** _(Phase 2 - Optional)_
- Deferred to future phase

#### User Endpoints

**GET /api/users/me**
- **Description**: Get current authenticated user profile
- **Authentication**: Required
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "enabled": true,
    "createdAt": "2026-02-18T10:00:00Z"
  }
}
```

**PUT /api/users/me**
- **Description**: Update current user profile
- **Authentication**: Required
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Smith"
}
```
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Smith"
  }
}
```

#### Transaction Endpoints

**GET /api/transactions**
- **Description**: Get all transactions for current user
- **Authentication**: Required
- **Query Parameters**:
  - `page` (optional, default: 0)
  - `size` (optional, default: 20)
  - `type` (optional: INCOME or EXPENSE)
  - `category` (optional: category filter)
  - `startDate` (optional: ISO date)
  - `endDate` (optional: ISO date)
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": 1,
        "amount": 50.00,
        "type": "EXPENSE",
        "category": "FOOD",
        "description": "Grocery shopping",
        "transactionDate": "2026-02-18T10:00:00Z",
        "createdAt": "2026-02-18T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 0,
      "size": 20,
      "totalElements": 1,
      "totalPages": 1
    }
  }
}
```

**GET /api/transactions/{id}**
- **Description**: Get transaction by ID
- **Authentication**: Required (must be owner)
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 50.00,
    "type": "EXPENSE",
    "category": "FOOD",
    "description": "Grocery shopping",
    "transactionDate": "2026-02-18T10:00:00Z",
    "receiptUrl": "/uploads/receipt123.jpg",
    "createdAt": "2026-02-18T10:00:00Z"
  }
}
```

**POST /api/transactions**
- **Description**: Create a new transaction
- **Authentication**: Required
- **Request Body**:
```json
{
  "amount": 50.00,
  "type": "EXPENSE",
  "category": "FOOD",
  "description": "Grocery shopping",
  "transactionDate": "2026-02-18T10:00:00Z"
}
```
- **Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 50.00,
    "type": "EXPENSE",
    "category": "FOOD",
    "description": "Grocery shopping",
    "transactionDate": "2026-02-18T10:00:00Z",
    "createdAt": "2026-02-18T10:00:00Z"
  }
}
```

**PUT /api/transactions/{id}**
- **Description**: Update existing transaction
- **Authentication**: Required (must be owner)
- **Request Body**:
```json
{
  "amount": 55.00,
  "description": "Grocery shopping - updated"
}
```
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 55.00,
    "type": "EXPENSE",
    "category": "FOOD",
    "description": "Grocery shopping - updated",
    "transactionDate": "2026-02-18T10:00:00Z",
    "updatedAt": "2026-02-18T11:00:00Z"
  }
}
```

**DELETE /api/transactions/{id}**
- **Description**: Delete transaction
- **Authentication**: Required (must be owner)
- **Response** (204 No Content)

**POST /api/transactions/{id}/receipt** _(Phase 3 - Optional)_
- Receipt upload feature deferred

**GET /api/transactions/summary**
- **Description**: Get financial summary
- **Authentication**: Required
- **Query Parameters**: `month` (optional, format: YYYY-MM)
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalIncome": 5000.00,
    "totalExpense": 3500.00,
    "netBalance": 1500.00,
    "transactionCount": 45,
    "categoryBreakdown": [
      {
        "category": "FOOD",
        "total": 800.00,
        "percentage": 22.9
      }
    ]
  }
}
```

#### Admin Endpoints _(Phase 2-3 - Optional)_

Admin functionality can be added later as needed:
- User management
- System statistics
- Transaction oversight

### 5.3 Error Handling

**HTTP Status Codes**:
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `204 No Content` - Successful deletion
- `400 Bad Request` - Invalid input/validation error
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Duplicate resource
- `500 Internal Server Error` - Server error

**Error Code Examples**:

```json
{
  "success": false,
  "error": {
    "code": "AUTH-001",
    "message": "Invalid credentials",
    "details": "Email or password is incorrect"
  },
  "timestamp": "2026-02-18T10:30:00Z"
}
```

```json
{
  "success": false,
  "error": {
    "code": "VALID-001",
    "message": "Validation failed",
    "details": {
      "email": "Email is required",
      "password": "Must be at least 8 characters"
    }
  },
  "timestamp": "2026-02-18T10:30:00Z"
}
```

**Common Error Codes**:
- `AUTH-001`: Invalid credentials
- `AUTH-002`: Token expired
- `AUTH-003`: Insufficient permissions
- `AUTH-004`: Email not verified
- `VALID-001`: Validation failed
- `DB-001`: Resource not found
- `DB-002`: Duplicate entry
- `BUSINESS-001`: Invalid transaction amount
- `BUSINESS-002`: Unauthorized access to resource
- `SYSTEM-001`: Internal server error

---

## 6.0 DATABASE DESIGN

### 6.1 Entity Relationship Diagram

**IT342 Requirement: Minimum 5 Tables - We have 6 tables**

```
                              USERS (1) ──────── (*) TRANSACTIONS
                                │                        │
                                │                        │
                                │                        │ (*)
                                │                        │
                                │                   FILES (receipts)
                                │
                                │ (*)
                                │
                            USER_ROLES (join table)
                                │
                                │ (*)
                                │
                              ROLES
                                
                              USERS (1) ──────── (*) EMAIL_LOGS
```

**Detailed Relationships**:
- **One-to-Many**: User → Transactions (One user has many transactions)
- **Many-to-Many**: User ↔ Roles (via user_roles join table)
- **One-to-Many**: User → Files (One user uploads many files)
- **Many-to-One**: Transaction → File (optional receipt)
- **One-to-Many**: User → Email_Logs (tracking sent emails)

### 6.2 Table Schemas

#### users
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  oauth_provider VARCHAR(50), -- 'google', 'local', NULL
  oauth_id VARCHAR(255), -- Google user ID
  enabled BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_oauth_id (oauth_id),
  INDEX idx_created_at (created_at)
);
```

**Fields**:
- `id`: Unique identifier (auto-increment)
- `email`: User email address (unique, used for login)
- `password_hash`: BCrypt hashed password (NULL for OAuth-only users)
- `first_name`: User's first name
- `last_name`: User's last name
- `oauth_provider`: 'google' if registered via OAuth, 'local' for email/password, NULL for legacy
- `oauth_id`: Google user ID if OAuth registration
- `enabled`: Account active status
- `email_verified`: Email verification status (for SMTP feature)
- `created_at`: Account creation timestamp
- `updated_at`: Last modification timestamp

#### roles
```sql
CREATE TABLE roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Default roles
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');
```

**Fields**:
- `id`: Unique identifier
- `name`: Role name (ROLE_USER, ROLE_ADMIN)

#### user_roles
```sql
CREATE TABLE user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```

**Fields**:
- `user_id`: Reference to users table
- `role_id`: Reference to roles table
- **Composite Primary Key**: (user_id, role_id)

#### transactions
```sql
CREATE TABfile_id BIGINT, -- FK to files table (IT342 file upload requirement)
  transaction_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receipt_file_id) REFERENCES files(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_transaction_date (transaction_date),
  INDEX idx_type (type),
  INDEX idx_category (category)
);
```

**Fields**:
- `id`: Unique identifier
- `user_id`: Reference to owning user
- `amount`: Transaction amount (2 decimal precision)
- `type`: INCOME or EXPENSE (enum)
- `category`: Transaction category (enum)
- `description`: Optional description
- `receipt_file_id`: Reference to uploaded receipt file (IT342 requirement)
- `id`: Unique identifier
- `user_id`: Reference to owning user
- `amount`: Transaction amount (2 decimal precision)
- `type`: INCOME or EXPENSE (enum)
- `category`: Transaction category (enum)
- `description`: Optional description
- `receipt_url`: Path to uploaded receipt file
- `transaction_date`: When transaction occurred
- `created_at`: Record creation timestamp
- `updated_at`: Last modification timestamp

**Transaction Types**:
- `INCOME`
- `EXPENSE`

**Transaction Categories**:
- Income: `SALARY`, `FREELANCE`, `INVESTMENT`, `GIFT`, `OTHER_INCOME`
- Expense: `FOOD`, `RENT`, `UTILITIES`, `TRANSPORT`, `ENTERTAINMENT`, `HEALTHCARE`, `EDUCATION`, `SHOPPING`, `OTHER_EXPENSE`
files (IT342 File Upload Requirement - TABLE #5)
```sql
CREATE TABLE files (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  stored_filename VARCHAR(255) NOT NULL, -- UUID-based filename for security
  file_path VARCHAR(500) NOT NULL, -- Server storage path
  file_size BIGINT NOT NULL, -- Size in bytes
  mime_type VARCHAR(100) NOT NULL, -- image/jpeg, image/png, application/pdf
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_stored_filename (stored_filename)
);
```

**Fields**:
- `id`: Unique identifier
- `user_id`: Reference to user who uploaded
- `original_filename`: User's original filename
- `stored_filename`: UUID-generated secure filename
- `file_path`: Full server storage path (e.g., /uploads/receipts/uuid.jpg)
- `file_size`: File size in bytes (for validation/limits)
- `mime_type`: Content type (image/jpeg, image/png, application/pdf)
- `upload_date`: When file was uploaded

**Purpose**: IT342 mandatory file upload requirement for receipt images

#### email_logs (IT342 SMTP Tracking - TABLE #6)
```sql
CREATE TABLE email_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  email_type VARCHAR(50) NOT NULL, -- WELCOME, TRANSACTION_NOTIFICATION, PASSWORD_RESET
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL, -- SENT, FAILED
  error_message VARCHAR(500),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_email_type (email_type),
  INDEX idx_sent_at (sent_at)
);
```

**Fields**:
- `id`: Unique identifier
- `user_id`: Reference to user (nullable for system emails)
- `email_type`: Type of email sent (WELCOME, TRANSACTION_NOTIFICATION, etc.)
- `recipient_email`: Email address of recipient
- `subject`: Email subject line
- `body`: Email content (TEXT for long content)
- `sent_at`: Timestamp of send attempt
- `status`: SENT or FAILED
- `error_message`: Error details if failed

**Purpose**: IT342 mandatory SMTP email requirement tracking

#### 
#### refresh_tokens (Optional - for JWT refresh)
```sql
CREATE TABLE refresh_tokens (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  expiry_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token (token),
  INDEX idx_user_id (user_id)
);
```

### 6.3 Database Configuration

**Connection Settings** (application.properties):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/centsibility?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Hibernate Settings**:
- Auto DDL: `update` (creates/updates tables automatically)
- Dialect: `MySQLDialect`
- Show SQL: Enabled for development

---

## 7.0 UI/UX DESIGN

### 7.1 Web Application Wireframes

**Note**: Detailed wireframes to be created in Figma

#### Homepage / Dashboard
```
┌─────────────────────────────────────────────┐
│  [Logo] Centsibility    [User Menu ▼] [🔔] │
├─────────────────────────────────────────────┤
│                                             │
│  Welcome, John!                             │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  Income  │  │ Expense  │  │  Balance │ │
│  │ $5,000   │  │ $3,500   │  │  $1,500  │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  [+ Add Transaction]                        │
│                                             │
│  Recent Transactions                        │
│  ┌─────────────────────────────────────┐   │
│  │ 🍔 Food - $15.00      Feb 18, 2026  │   │
│  │ 💼 Salary - $2,500    Feb 15, 2026  │   │
│  │ 🚗 Transport - $30    Feb 17, 2026  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [View All Transactions]                    │
│                                             │
└─────────────────────────────────────────────┘
```

#### Login Page
```
┌─────────────────────────────────────────────┐
│                                             │
│           Centsibility Logo                 │
│     Track Your Financial Journey            │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Email                                 │  │
│  │ [                              ]      │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Password                              │  │
│  │ [                              ]      │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  [Forgot Password?]                         │
│                                             │
│  [        Login        ]                    │
│                                             │
│  ──────── or ────────                       │
│                                             │
│  [🔵 Continue with Google]                 │
│                                             │
│  Don't have an account? [Sign Up]          │
│                                             │
└─────────────────────────────────────────────┘
```

#### Add/Edit Transaction
```
┌─────────────────────────────────────────────┐
│  ← Back          Add Transaction            │
├─────────────────────────────────────────────┤
│                                             │
│  Transaction Type                           │
│  ( ) Income  (•) Expense                    │
│                                             │
│  Amount *                                   │
│  [$ ________________]                       │
│                                             │
│  Category *                                 │
│  [Select Category ▼]                        │
│   - Food                                    │
│   - Transport                               │
│   - Utilities                               │
│   ...                                       │
│                                             │
│  Description                                │
│  [_____________________________]            │
│  [_____________________________]            │
│                                             │
│  Date *                                     │
│  [📅 Feb 18, 2026]                         │
│                                             │
│  Receipt (optional)                         │
│  [📎 Upload File] or [📷 Take Photo]        │
│                                             │
│  [Cancel]           [Save Transaction]      │
│                                             │
└─────────────────────────────────────────────┘
```

#### Transaction List
```
┌─────────────────────────────────────────────┐
│  ← Dashboard        Transactions            │
├─────────────────────────────────────────────┤
│                                             │
│  Filter: [All ▼] [This Month ▼] [🔍 Search]│
│                                             │
│  February 2026                              │
│  ┌─────────────────────────────────────┐   │
│  │ 🍔 Food           -$15.00    [⋮]   │   │
│  │ Grocery shopping                    │   │
│  │ Feb 18, 2026                        │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ 🚗 Transport      -$30.00    [⋮]   │   │
│  │ Gas                                 │   │
│  │ Feb 17, 2026                        │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ 💼 Salary        +$2,500     [⋮]   │   │
│  │ Monthly salary                      │   │
│  │ Feb 15, 2026                        │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Load More]                                │
│                                             │
└─────────────────────────────────────────────┘
```

### 7.2 Mobile Application Wireframes

**Note**: Detailed wireframes to be created in Figma

#### Bottom Navigation
```
┌─────────────────────────────────────────┐
│                                         │
│         (Main Screen Content)           │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│  [🏠 Home] [📊 Stats] [➕] [📄 List] [👤]│
└─────────────────────────────────────────┘
```

#### Mobile Dashboard
```
┌─────────────────────────────────────────┐
│  ☰ Menu           Centsibility      🔔  │
├─────────────────────────────────────────┤
│                                         │
│  Hi, John! 👋                           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ February Balance                │   │
│  │ $1,500.00                       │   │
│  │                                 │   │
│  │ Income: $5,000 Expense: $3,500 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Quick Actions                          │
│  ┌──────────┐  ┌──────────┐            │
│  │    +     │  │    −     │            │
│  │  Income  │  │ Expense  │            │
│  └──────────┘  └──────────┘            │
│                                         │
│  Recent                                 │
│  ┌─────────────────────────────────┐   │
│  │ 🍔 Grocery  $15.00   Today      │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │ 🚗 Gas      $30.00   Yesterday  │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

#### Mobile Add Transaction (Bottom Sheet)
```
┌─────────────────────────────────────────┐
│                                         │
│         (Dashboard Behind)              │
│                                         │
├─────────────────────────────────────────┤
│  ______________________________________  │
│                                         │
│  Add Expense                            │
│                                         │
│  $ [ Amount         ]                   │
│                                         │
│  🍔 Food                          ▼     │
│                                         │
│  [ Description                   ]      │
│                                         │
│  📅 Today             📷 Receipt        │
│                                         │
│  [          Save          ]             │
│                                         │
└─────────────────────────────────────────┘
```

### 7.3 Design System

**Color Palette**:
- Primary: `#2563EB` (Blue)
- Secondary: `#7C3AED` (Purple)
- Success/Income: `#10B981` (Green)
- Error/Expense: `#EF4444` (Red)
- Warning: `#F59E0B` (Amber)
- Background: `#F9FAFB` (Light Gray)
- Text: `#111827` (Dark Gray)
- Border: `#E5E7EB` (Gray)

**Typography**:
- Font Family: Inter, system-ui, sans-serif
- Headings: Bold, sizes 24px-32px
- Body: Regular, 14px-16px
- Small text: 12px-14px

**Spacing**:
- Base unit: 8px
- Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Components**:
- **Buttons**: Rounded corners (8px), padding 12px 24px, hover states
- **Input Fields**: Border, focus states, error states
- **Cards**: Shadow, rounded corners, padding
- **Icons**: Consistent size (24px default), colored by category
- **Modals**: Overlay with backdrop, centered content

**Responsive Breakpoints**:
- Mobile: 0-767px
- Tablet: 768px-1023px
- Desktop: 1024px+

**Accessibility**:
- WCAG 2.1 Level AA compliance
- Minimum contrast ratio 4.5:1
- Touch targets minimum 44x44px
- Keyboard navigation support
- Screen reader friendly
- Focus indicators visible

---

## 8.0 PLAN (Flexible & Iterative)

### 8.1 Simplified Development Approach

**Philosophy**: Start small, working version first. Add features only when needed.

#### Phase 1: Project Initialization (COMPLETED ✅)
**Duration**: Week 1 (Feb 18-24, 2026)

**Week 1: Setup & Documentation**
- ✅ Day 1-2: Project repository setup, folder structure
- ✅ Day 3-4: Complete SDD, FRS, requirements
- ✅ Day 5: Backend package structure creation
- ✅ Day 6: Dependency configuration (pom.xml)
- ✅ Day 7: Initial documentation (README, PROJECT_STATUS, SETUP_GUIDE)

**Deliverables**:
- ✅ Project structure created
- ✅ Backend layered architecture established
- ✅ All dependencies added to pom.xml
- ✅ Template entity classes (User, Role, Transaction)
- ✅ Template repositories, services, controllers
- ✅ Configuration files (application.properties, WebConfig)
- ✅ Comprehensive documentation

---

#### Phase 2: MVP Backend (CURRENT 🚧)
**Duration**: 2-3 weeks (flexible)
**Goal**: Get a working system with core features only

**Step 1: Database Setup**
- Install and configure MySQL
- Create database and test connection
- Verify entity auto-creation works

**Step 2: Basic Authentication**
- Implement user registration
- Implement login with JWT
- Test with Postman
- Add password hashing

**Step 3: Transaction CRUD**
- Implement: Create transaction
- Implement: View user's transactions
- Implement: Edit transaction
- Implement: Delete transaction
- Test each operation

**Step 4: Basic Validation**
- Add input validation
- Handle errors gracefully
- Test edge cases

**Deliverables**:
- Working authentication
- Working transaction management
- Tested with Postman

**Milestone M1**: MVP backend functional

---

#### Phase 3: MVP Web Frontend (Future)
**Duration**: 1-2 weeks (when backend is ready)
**Goal**: Simple web interface for core features

**Step 1: Basic Setup**
- React login/register pages
- Token storage and authentication
- Protected routes

**Step 2: Transaction Pages**
- List transactions (simple table)
- Add transaction form
- Edit/delete functionality

**Step 3: Simple Styling**
- Basic responsive design
- Clean, simple UI
- No fancy charts yet

**Deliverables**:
- Working web application
- Users can manage transactions

**Milestone M2**: MVP web app complete

---

#### Phase 4: Enhancements (Optional - Based on Need)
**Duration**: As needed
**Decide later what to add:**

**Option A: Add Features**
- Transaction filtering
- Financial summary
- Charts/visualizations

**Option B: Add Mobile App**
- React Native setup
- Mirror web functionality

**Option C: Add Admin Panel**
- User management
- System oversight

**Option D: Add Integrations**
- Email notifications
- File uploads
- OAuth login

**Approach**: Evaluate what's needed after MVP is working

---

### 8.2 Flexible Milestones

| Milestone | Description | Status |
|-----------|-------------|--------|
| M1 | MVP Backend (Auth + Transactions) | 🔜 Next |
| M2 | MVP Web Frontend | ⏳ After M1 |
| M3 | First Full Working System | ⏳ Goal |
| M4+ | Enhancements (TBD) | 📋 Decide later |

### 8.3 Critical Path (Simplified)

**Must complete in order:**

1. **Database Setup**: Can't do anything without it
2. **Basic Authentication**: Users need to login
3. **Transaction CRUD**: Core feature
4. **Basic Frontend**: Need to use the system

**Everything else is optional** and can be decided later based on:
- Time available
- Actual requirements discovered
- User feedback
- Course requirements

### 8.4 Simplified Risk Management

**Keep it simple approach:**

1. **Start with what works** - Don't add complexity until needed
2. **Test frequently** - Use Postman to verify backend before building frontend
3. **One feature at a time** - Complete and test before moving on
4. **Skip optional features** - Only add if really needed
5. **Use what you know** - Stick to documented patterns in templates
6. **Document as you go** - Update PROJECT_STATUS.md weekly

### 8.5 Minimum Requirements (MVP)

**Essential Software**:
- Java 17
- Maven
- MySQL 8.0
- Node.js (for React later)
- VS Code or IntelliJ IDEA
- Postman (API testing)

**Optional (Add Later)**:
- Android Studio (if making mobile app)
- Email service (if adding notifications)
- Cloud hosting (for deployment)

**Core Skills Needed**:
- Basic Java and Spring Boot
- Basic SQL
- Basic React (for frontend)
- REST API concepts

**Nice to Have**:
- Spring Security knowledge
- React Native (only if doing mobile)
- DevOps (only if deploying)

---

## APPENDICES

### Appendix A: Glossary

- **JWT**: JSON Web Token - Authentication token format
- **BCrypt**: Password hashing algorithm
- **CRUD**: Create, Read, Update, Delete operations
- **DTO**: Data Transfer Object - Object for transferring data between layers
- **OAuth**: Open Authorization - Delegated authorization framework
- **RBAC**: Role-Based Access Control
- **ORM**: Object-Relational Mapping (Hibernate)
- **REST**: Representational State Transfer - API architectural style

### Appendix B: References

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Security Documentation: https://spring.io/projects/spring-security
- React Documentation: https://react.dev/
- React Native Documentation: https://reactnative.dev/
- MySQL Documentation: https://dev.mysql.com/doc/
- JWT.io: https://jwt.io/

### Appendix C: Contact Information

**Project Team**: Baritua  
**Project Repository**: IT342_Centsibility_G4_Baritua  
**Institution**: [Your Institution]  
**Course**: IT342 - System Integration and Architecture

---

## SUMMARY: START SIMPLE

**Current Focus**: Build a working MVP with these core features only:
1. ✅ User can register and login
2. ✅ User can add income/expense transactions
3. ✅ User can view their transaction history
4. ✅ User can edit/delete their transactions
5. ✅ Basic category selection

**Everything else is optional.** Add features only when you're sure you need them.

**Next Immediate Steps**:
1. Install MySQL and create database
2. Update application.properties with database credentials
3. Run backend and verify tables are created
4. Test registration endpoint with Postman
5. Test login endpoint with Postman
6. Implement one transaction endpoint at a time

**Document Review Cycle**: Update this SDD as you discover what features you actually need. Remove features you won't implement, add detail to features you will.

---

**Document End**

*This is a living document. Update it based on what you actually need, not what might be nice to have.*
