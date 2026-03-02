# IT342 Final Requirements Summary

**Date:** February 18, 2026  
**Team:** Group 4 - Baritua  
**Project:** Centsibility

---

## ⚠️ CRITICAL: Course Requirements Update

The IT342 course has published **MANDATORY** requirements for Final Defense. All features listed below must be working and demonstrated during the final defense. No features are optional.

---

## 1. Authentication & Security (REQUIRED)

Your system **MUST** implement ALL of these:

- ✅ User Registration
- ✅ User Login  
- ✅ JWT Authentication
- ✅ Logout
- ✅ Password hashing (BCrypt)
- ✅ Protected routes/pages
- ✅ /me endpoint (get current authenticated user)

**Status:** Structure ready, implementation needed

---

## 2. Role-Based Access Control (REQUIRED)

**Minimum 2 user roles** with restrictions at both API and UI level:

- ✅ Admin role (can manage data)
- ✅ User role (limited access)
- ✅ API-level role restriction (`@PreAuthorize`)
- ✅ UI-level role restriction (hide/show based on role)

**Status:** Role entities exist, authorization logic needed

---

## 3. Core Business Module (REQUIRED)

At least **1 major entity** (excluding User) with full CRUD:

- ✅ Transaction entity (our primary business entity)
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Proper validation
- ✅ One-to-Many relationship (User → Transactions)

**Status:** Entities and endpoints defined, implementation needed

---

## 4. System Integration Features (ALL REQUIRED) 🚨

### 4.1 External API Integration (REQUIRED)
- **Must** consume a real public API
- **Must** be used in a meaningful feature
- Data **must** be displayed in your system

**Suggestions for Centsibility:**
- Currency exchange rate API (e.g., ExchangeRate-API, Fixer.io)
- Financial news API
- Stock market data API

**Status:** ❌ Not implemented yet

---

### 4.2 Google OAuth Login (REQUIRED)
- Login using Google (or other auth provider)
- User saved/linked in database
- **Must** generate your own JWT after OAuth login

**Status:** ❌ OAuth dependency exists, implementation needed

**Action Items:**
1. Get Google OAuth credentials from Google Cloud Console
2. Implement OAuth flow in AuthController
3. Save OAuth user to database with `oauth_provider` and `oauth_id` fields
4. Generate JWT token after successful OAuth
5. Test login flow

---

### 4.3 File Upload (REQUIRED)
- Upload file (image/PDF/etc.)
- File stored on server
- File linked to database record
- User can view/download it

**For Centsibility:** Receipt upload for transactions

**Status:** ❌ File entity exists, storage service needed

**Action Items:**
1. Create uploads directory structure
2. Implement FileStorageService (UUID naming, size limits)
3. Add file upload endpoint: `POST /api/transactions/{id}/upload-receipt`
4. Store metadata in `files` table
5. Link to transaction via `receipt_file_id`
6. Add download endpoint: `GET /api/files/{id}`

---

### 4.4 Email Sending - SMTP (REQUIRED)
**Must** send real emails via SMTP (console print is NOT accepted):

1. **One account-related email** (e.g., welcome, verification)
2. **One system notification email** (e.g., receipt, approval)

**For Centsibility:**
- Welcome email on registration
- Transaction notification email

**Status:** ❌ Spring Mail dependency exists, service needed

**Action Items:**
1. Configure SMTP in application.properties (Gmail App Password or SendGrid)
2. Create EmailService
3. Send welcome email on user registration
4. Send transaction notification (e.g., monthly summary, large expense alert)
5. Log all emails to `email_logs` table
6. Test actual email delivery

---

### 4.5 Payment Gateway Integration (CONDITIONAL)
- **Required** only if it makes sense for your domain
- Use real payment provider in **Test Mode**
- Record payment results in database
- Handle success and failure
- **No simulated payment allowed**

**For Centsibility:** Could be used for premium features (charts, exports, etc.)

**Status:** ❌ Optional/TBD - evaluate if needed

---

### 4.6 Real-Time Feature (OPTIONAL BONUS)
Use either:
- WebSocket (recommended), OR
- Polling (auto-refresh every few seconds)

Must demonstrate live updates between users.

**Status:** ❌ Bonus feature, not required

---

## 5. Database Requirements (REQUIRED)

- ✅ **Minimum 5 database tables** (we have 6)
  1. users
  2. roles
  3. user_roles (join table)
  4. transactions
  5. files
  6. email_logs
- ✅ Proper relationships (One-to-Many, Many-to-One)
- ✅ No plain-text passwords (BCrypt hashing)
- ✅ Proper normalization (avoid duplicate data)
- ✅ Use DTOs (do not expose password in API responses)

**Status:** Schema designed, database creation pending

---

## 6. Architecture Requirements (REQUIRED)

**Layered Architecture** (which we're using):

- ✅ Controller layer (defined)
- ✅ Service layer (defined)
- ✅ Repository layer (defined)
- ✅ DTOs (defined)
- ⏳ Security configuration (needs implementation)
- ✅ Global exception handling (defined)

**Must include:**
- ✅ Architecture diagram in documentation
- ✅ Short explanation of the pattern used

**Status:** Structure complete, security configuration needed

---

## 7. Repository Structure (REQUIRED)

**Format:** `IT342_<AppName>_<Section>_<Lastname>`

**Required folders:**
- ✅ backend/
- ✅ web/
- ✅ mobile/
- ⚠️ **docs/** (we currently have "documents" - may need to rename)

**Current:** `IT342_Centsibility_G4_Baritua`

**Action:** Consider renaming `documents/` to `docs/` to match exact requirement

---

## 8. Application Name (SATISFIED)

✅ **Centsibility** - Good name (short, memorable, reflects functionality)

---

## Implementation Priority

### Phase 1: Core (Weeks 1-3)
1. **Database Setup** - Create MySQL database with 6 tables
2. **Authentication** - Registration, Login, JWT, /me endpoint
3. **Authorization** - Role-based access (Admin, User)
4. **Transaction CRUD** - All 5 endpoints with validation

### Phase 2: Integration Features (Weeks 4-5) - CANNOT SKIP
5. **Google OAuth** - Social login implementation
6. **File Upload** - Receipt upload and storage
7. **SMTP Email** - Welcome + notification emails
8. **External API** - Integrate financial/currency API

### Phase 3: Frontend (Weeks 6-8)
9. **Web Application** - React app with all features
10. **Role-based UI** - Different views for Admin vs User
11. **File Upload UI** - Receipt upload interface
12. **OAuth Button** - "Continue with Google" button

### Phase 4: Mobile (Weeks 9-11)
13. **React Native App** - Mobile version
14. **Camera Integration** - For receipt photos
15. **Testing** - Both platforms

### Phase 5: Final (Week 12)
16. **Testing** - Unit, integration, E2E
17. **Documentation** - Complete all docs
18. **Architecture Diagram** - Visual representation
19. **Final Defense Prep** - Practice demo

---

## External Services Needed

You will need to set up accounts/credentials for:

1. **Google Cloud Console**
   - Create OAuth 2.0 credentials
   - Configure redirect URIs

2. **SMTP Email Provider** (choose one):
   - Gmail App Password (free)
   - SendGrid (free tier)
   - Mailgun
   - AWS SES

3. **External API** (choose one):
   - ExchangeRate-API (free)
   - Fixer.io
   - Alpha Vantage (stocks)
   - NewsAPI (financial news)

4. **Payment Gateway** (if applicable):
   - Stripe (test mode)
   - PayPal Sandbox
   - PayMongo (if Philippines)

---

## Risk Assessment

### High Risk (No Workarounds):
- ❌ **Google OAuth** - Must be implemented, no alternatives
- ❌ **File Upload** - Must be implemented, no alternatives  
- ❌ **SMTP Email** - Must send real emails, console logging rejected
- ❌ **External API** - Must consume real API, cannot fake

### Medium Risk:
- ⚠️ **Payment Gateway** - May not apply to our domain, needs clarification
- ⚠️ **Real-Time Feature** - Optional bonus, nice to have

### Low Risk:
- ✅ Authentication & Authorization - Standard Spring Security
- ✅ Transaction CRUD - Standard REST operations
- ✅ Database - MySQL setup is straightforward

---

## Success Criteria for Final Defense

**You MUST demonstrate:**

1. ✅ User registration with BCrypt password
2. ✅ User login with email/password **AND** Google OAuth
3. ✅ JWT token generation and protected routes
4. ✅ Admin has different access than User (API + UI)
5. ✅ Full CRUD on transactions
6. ✅ Receipt file upload working
7. ✅ Welcome email received (real email)
8. ✅ Transaction notification email received (real email)
9. ✅ External API data displayed in system
10. ✅ Web application fully functional
11. ✅ Mobile application working
12. ✅ All features tested and documented

**If any of the above are missing, the project is incomplete.**

---

## Key Differences from Previous "MVP" Approach

| Feature | Previous Plan | IT342 Requirement |
|---------|--------------|-------------------|
| Google OAuth | "Optional, add if time permits" | **REQUIRED** |
| File Upload | "Nice to have" | **REQUIRED** |
| SMTP Email | "Can skip for simplicity" | **REQUIRED** |
| External API | "Not planned" | **REQUIRED** |
| Admin Panel | "Evaluate if needed" | **REQUIRED** (role-based access) |
| Mobile App | "Separate decision" | **REQUIRED** |
| Payment Gateway | "Not decided" | Required if applicable |

**Bottom Line:** The simplified MVP approach will NOT meet course requirements. All integration features are mandatory.

---

## Next Immediate Actions

**Week 1 (Now):**
1. ✅ Read and understand these requirements
2. ⬜ Install Maven
3. ⬜ Install MySQL 8.0
4. ⬜ Create centsibility database
5. ⬜ Update application.properties with database credentials
6. ⬜ Run Spring Boot and verify 6 tables created

**Week 2:**
1. ⬜ Implement user registration + BCrypt
2. ⬜ Implement user login + JWT
3. ⬜ Implement /me endpoint
4. ⬜ Add role-based authorization
5. ⬜ Test with Postman

**Week 3:**
1. ⬜ Implement transaction CRUD
2. ⬜ Add validation
3. ⬜ Test all endpoints

**Week 4:**
1. ⬜ Get Google OAuth credentials
2. ⬜ Implement OAuth login
3. ⬜ Implement file upload
4. ⬜ Configure SMTP and send emails

**Week 5:**
1. ⬜ Integrate external API
2. ⬜ Complete backend testing

**Weeks 6-12:**
1. ⬜ Build web frontend
2. ⬜ Build mobile app
3. ⬜ Final testing
4. ⬜ Documentation
5. ⬜ Defense preparation

---

## Questions to Clarify with Instructor

1. **Payment Gateway**: Does it apply to Centsibility? (We could use it for premium features, but core functionality doesn't require payments)

2. **Folder Naming**: Is "documents" acceptable or must it be exactly "docs"?

3. **Mobile App Depth**: What's the minimum functionality required for mobile app?

4. **External API**: Any restrictions on which APIs can be used?

---

## Resources

**Documentation:**
- [SYSTEM_DESIGN_DOCUMENT.md](SYSTEM_DESIGN_DOCUMENT.md) - Complete system specification (updated with requirements)
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current progress tracking (updated with requirements)
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Installation instructions
- [PACKAGE_STRUCTURE.md](PACKAGE_STRUCTURE.md) - Backend architecture

**External Services:**
- [Google Cloud Console](https://console.cloud.google.com/) - OAuth setup
- [ExchangeRate-API](https://www.exchangerate-api.com/) - Free currency API
- [SendGrid](https://sendgrid.com/) - Email service
- [Stripe](https://stripe.com/docs/testing) - Payment gateway testing

---

## Conclusion

The IT342 course requirements are comprehensive and mandatory. The previous "simplified MVP" approach will not satisfy the course requirements. All integration features (OAuth, file upload, SMTP email, external API) must be implemented and working for Final Defense.

**Estimated Total Development Time:** 12 weeks full-time

**Current Status:** Week 1-2 (Setup phase)

**Critical Path:** Database → Authentication → CRUD → Integrations → Frontend → Mobile → Testing

**Success depends on:** Starting integration features early (Week 4), not waiting until the end.

---

_Last Updated: February 18, 2026_
