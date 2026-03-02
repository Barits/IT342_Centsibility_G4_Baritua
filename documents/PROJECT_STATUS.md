# Centsibility - Development Status

**Last Updated:** February 18, 2026  
**Team:** Group 4 - Baritua  
**Approach:** IT342 Final Requirements - All Integration Features Mandatory

---

## ⚠️ CRITICAL UPDATE - IT342 Course Requirements

The IT342 course has published **MANDATORY** requirements for Final Defense. The previous "simplified MVP" approach conflicts with course requirements. All features listed below are **REQUIRED** and must be working during Final Defense.

### Mandatory Features Checklist (IT342):

**✅ Authentication & Security (REQUIRED)**:
- [ ] User Registration
- [ ] User Login
- [ ] JWT Authentication
- [ ] Logout
- [ ] Password hashing (BCrypt)
- [ ] Protected routes/pages  
- [ ] /me endpoint (get current user)

**✅ Role-Based Access Control (REQUIRED)**:
- [ ] Minimum 2 user roles (Admin, User)
- [ ] API-level role restrictions
- [ ] UI-level role restrictions

**✅ Core Business Module (REQUIRED)**:
- [ ] Transaction entity (primary business entity)
- [ ] Full CRUD operations
- [ ] Proper validation

**✅ System Integration Features (ALL REQUIRED)**:
- [ ] **External API Integration** - Consume real public API
- [ ] **Google OAuth Login** - Social login + JWT generation
- [ ] **File Upload** - Upload files, store on server, link to database
- [ ] **Email Sending (SMTP)** - Welcome email + notifications (no console print)
- [ ] **Payment Gateway** (if applicable) - Sandbox mode
- [ ] **Real-Time Feature** (Optional Bonus) - WebSocket or polling

**✅ Database Requirements (REQUIRED)**:
- [ ] Minimum 5 database tables (we have 6)
- [ ] Proper relationships
- [ ] No plain-text passwords
- [ ] Proper normalization
- [ ] Use DTOs

**✅ Architecture Requirements (REQUIRED)**:
- [x] Layered Architecture
- [x] Controller-Service-Repository layers
- [x] DTOs
- [ ] Security configuration
- [x] Global exception handling
- [ ] Architecture diagram

---

## Overview

This document tracks the development progress of the Centsibility financial management platform following **mandatory IT342 course requirements**.

---

## Development Phases (Updated for IT342 Requirements)

### ✅ Phase 1: Project Initialization (COMPLETED)
**Status:** Complete  
**Duration:** Week 1

#### Completed Tasks:
- [x] Project repository created and initialized
- [x] Backend skeleton (Spring Boot) set up
- [x] Frontend (React) bootstrapped with Create React App
- [x] Mobile folder structure created
- [x] Documentation framework established
- [x] README.md with complete project specifications
- [x] Git repository initialized with proper .gitignore files
- [x] CORS configuration for frontend-backend communication
- [x] Proxy configuration in React app

#### Deliverables:
- Basic project structure
- Development environment setup guide
- Technology stack decisions documented

---

### 🚧 Phase 2: Core Backend Implementation (IN PROGRESS - ALL REQUIRED)
**Status:** In Progress  
**Target:** 3-4 weeks  
**Goal:** Implement ALL mandatory IT342 features

#### Priority 1: Database & Core Setup (Week 1-2):
- [ ] Install MySQL and create database `centsibility`
- [ ] Configure database credentials in application.properties
- [ ] Create all 6 required tables (users, roles, user_roles, transactions, files, email_logs)
- [ ] Run backend and verify tables auto-create
- [ ] Test connection

#### Priority 2: Authentication & Authorization (Week 2-3) - REQUIRED:
- [ ] Implement user registration (email, password, name)
- [ ] Implement BCrypt password hashing
- [ ] Implement login (return JWT token)
- [ ] Implement logout endpoint
- [ ] Implement /me endpoint (get current authenticated user)
- [ ] Add role-based access control (Admin, User roles)
- [ ] Add API-level role restrictions (@PreAuthorize)
- [ ] Test with Postman

#### Priority 3: Core Transaction CRUD (Week 3) - REQUIRED:
- [ ] Create transaction endpoint (POST /api/transactions)
- [ ] List user's transactions (GET /api/transactions)
- [ ] Get single transaction (GET /api/transactions/{id})
- [ ] Update transaction (PUT /api/transactions/{id})
- [ ] Delete transaction (DELETE /api/transactions/{id})
- [ ] Add validation for all fields
- [ ] Verify user owns transaction before edit/delete
- [ ] Test each endpoint with Postman

#### Priority 4: Google OAuth Integration (Week 4) - REQUIRED:
- [ ] Configure Google OAuth 2.0 credentials
- [ ] Implement OAuth login flow
- [ ] Save/link OAuth user in database
- [ ] Generate JWT after successful OAuth
- [ ] Test Google login flow

#### Priority 5: File Upload Feature (Week 4) - REQUIRED:
- [ ] Implement file upload service
- [ ] Store files on server with UUID naming
- [ ] Save file metadata to files table
- [ ] Link receipts to transactions
- [ ] Add file download endpoint
- [ ] Test file upload and retrieval

#### Priority 6: Email Sending (SMTP) (Week 4) - REQUIRED:
- [ ] Configure SMTP settings (Gmail/SendGrid)
- [ ] Implement email service
- [ ] Send welcome email on registration
- [ ] Send transaction notification emails
- [ ] Log all emails to email_logs table
- [ ] Test email delivery (not console print)

#### Priority 7: External API Integration (Week 5) - REQUIRED:
- [ ] Choose and integrate financial/currency API
- [ ] Implement API client service
- [ ] Display external API data in system
- [ ] Handle API errors gracefully
- [ ] Test API integration

**Note:** ALL features above are MANDATORY for IT342 Final Defense. Cannot skip.

---

### ⏳ Phase 3: Web Frontend (Week 6-8) - REQUIRED
**Status:** Not Started  
**Target:** 3 weeks after backend complete

#### Web Application Goals - ALL REQUIRED:
- [ ] Login page (email/password + Google OAuth button)
- [ ] Register page
- [ ] Protected routes implementation
- [ ] Role-based UI rendering
- [ ] Transaction list with pagination
- [ ] Add transaction form with file upload
- [ ] Edit/delete transaction functionality
- [ ] User profile page (/me data)
- [ ] Admin panel for user management
- [ ] Responsive design

---

### ⏳ Phase 4: Mobile Application (Week 9-11) - REQUIRED
**Status:** Not Started  
**Target:** 3 weeks

#### React Native Mobile App:
- [ ] Project initialization
- [ ] Authentication screens
- [ ] Transaction management screens
- [ ] File upload (camera integration)
- [ ] API integration
- [ ] Testing on Android/iOS

---

### ⏳ Phase 5: Testing & Documentation (Week 12) - REQUIRED
**Status:** Not Started

#### Testing:
- [ ] Unit tests for services
- [ ] Integration tests for APIs
- [ ] End-to-end testing
- [ ] Security testing

#### Documentation:
- [ ] Complete System Design Document ✅ (Done)
- [ ] Architecture diagram
- [ ] API documentation
- [ ] Deployment guide
- [ ] User manual

---

## What Changed from Previous Plan?

**❌ THESE ARE NO LONGER OPTIONAL - ALL ARE REQUIRED:**
- ✅ Google OAuth login - **MANDATORY**
- ✅ File upload functionality - **MANDATORY**
- ✅ Email verification/notifications (SMTP) - **MANDATORY**
- ✅ External API integration - **MANDATORY**
- ✅ Admin panel - **MANDATORY**
- ✅ Mobile application - **MANDATORY**
- ✅ Role-based access control - **MANDATORY**

**Reason:** IT342 course published final requirements. All integration features are mandatory for Final Defense.

---

## Current Week Focus

### Week 1-2: Initial Setup ✅ + Database Setup 🚧
- ✅ Project structure created
- ✅ Dependencies configured
- ✅ Template code created
- ✅ Documentation written
- 🚧 MySQL installation (in progress)
- 🚧 Database configuration (in progress)

### Week 3-4: Core Implementation (Upcoming)
- Authentication + Authorization
- Transaction CRUD
- Testing with Postman

### Week 5-6: Integration Features (Upcoming)
- Google OAuth
- File Upload
- SMTP Email
- External API

---

## Technical Debt & Known Issues

### Current Blockers:
- Maven not installed on development machine (need to install)
- MySQL not configured yet
- Database credentials need to be set
- Google OAuth credentials not obtained
- SMTP server not configured
- External API not selected

### Required External Services:
1. **Google Cloud Console** - OAuth 2.0 credentials
2. **SMTP Provider** - Gmail App Password or SendGrid
3. **External Financial API** - Currency exchange or financial news API
4. **Payment Gateway** (if applicable) - Stripe/PayPal sandbox

---

## Revised Metrics

### Authentication & Security: 0%
- ⏳ User Registration: 0%
- ⏳ User Login: 0%
- ⏳ JWT Authentication: 0%
- ⏳ Logout: 0%
- ⏳ Password Hashing: 0%
- ⏳ /me Endpoint: 0%

### Role-Based Access: 0%
- ⏳ Admin Role: 0%
- ⏳ User Role: 0%
- ⏳ API-level Restrictions: 0%
- ⏳ UI-level Restrictions: 0%

### Core Business Module: 0%
- ⏳ Create Transaction: 0%
- ⏳ List Transactions: 0%
- ⏳ Get Transaction: 0%
- ⏳ Update Transaction: 0%
- ⏳ Delete Transaction: 0%
- ⏳ Validation: 0%

### Integration Features: 0%
- ⏳ Google OAuth: 0% **REQUIRED**
- ⏳ File Upload: 0% **REQUIRED**
- ⏳ SMTP Email: 0% **REQUIRED**
- ⏳ External API: 0% **REQUIRED**
- ⏳ Payment Gateway: 0% (if applicable)

### Database: 20%
- ✅ Schema Designed: 100% (6 tables)
- ⏳ Database Created: 0%
- ⏳ Tables Created: 0%
- ⏳ Sample Data: 0%

---

## Next Immediate Steps

**Priority Order** (cannot deviate):

1. **Install development tools** (Week 1)
   - Install Maven
   - Install MySQL 8.0
   - Verify installations

2. **Database setup** (Week 1-2)
   - Create database: `CREATE DATABASE centsibility;`
   - Update application.properties
   - Run backend and verify 6 tables created

3. **Core authentication** (Week 2-3)
   - Implement registration + BCrypt
   - Implement login + JWT
   - Implement /me endpoint
   - Test with Postman

4. **Role-based access** (Week 3)
   - Add role checks to APIs
   - Test admin vs user access

5. **Transaction CRUD** (Week 3)
   - Implement all 5 endpoints
   - Test thoroughly

6. **Google OAuth** (Week 4)
   - Get Google credentials
   - Implement OAuth flow
   - Test Google login

7. **File Upload** (Week 4)
   - Implement file storage
   - Link to transactions
   - Test upload/download

8. **SMTP Email** (Week 4)
   - Configure SMTP
   - Implement welcome email
   - Implement notification email
   - Test delivery

9. **External API** (Week 5)
   - Choose API
   - Integrate
   - Display data
   - Test

10. **Frontend** (Week 6-8)
    - Build all required pages
    - Integrate with backend
    - Test thoroughly

11. **Mobile** (Week 9-11)
    - Build React Native app
    - Test on devices

12. **Final Testing** (Week 12)
    - Complete all testing
    - Fix bugs
    - Prepare for defense

---

## Success Criteria (IT342 Final Defense)

**Definition of Done:**
- ✅ User can register with email and password
- ✅ User can login with email/password AND Google OAuth
- ✅ JWT authentication working on all protected routes
- ✅ Admin has different access than regular users (both API and UI)
- ✅ User can perform full CRUD on transactions
- ✅ User can upload receipt files and link to transactions
- ✅ System sends welcome email on registration
- ✅ System sends notification emails
- ✅ System displays data from external API
- ✅ Web application fully functional
- ✅ Mobile application working
- ✅ All tested and documented

**Everything above is mandatory for course completion.**

---

## Notes

- This project follows the layered architecture pattern (Controller-Service-Repository)
- All security features must be implemented before deployment
- Code must follow proper naming conventions and best practices
- Regular commits and branch management required

---

**For detailed project requirements and final architecture, see [README.md](../README.md)**
