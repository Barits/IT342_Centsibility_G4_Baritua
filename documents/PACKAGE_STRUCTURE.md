# Backend Package Structure

This document explains the organization and purpose of each package in the Centsibility backend application.

---

## Overview

The backend follows a **layered architecture pattern** that separates concerns and promotes maintainability, testability, and scalability.

```
backend/src/main/java/com/centsibility/backend/
├── BackendApplication.java        # Spring Boot application entry point
├── config/                        # Configuration classes
│   └── WebConfig.java            # CORS and web configuration
├── controller/                    # REST API endpoints (Presentation Layer)
│   ├── AuthController.java       # Authentication endpoints
│   ├── TransactionController.java # Transaction management endpoints
│   └── UserController.java       # User management endpoints
├── service/                       # Business logic (Service Layer)
│   ├── TransactionService.java   # Transaction business logic
│   └── UserService.java          # User business logic
├── repository/                    # Data access (Persistence Layer)
│   ├── RoleRepository.java       # Role data access
│   ├── TransactionRepository.java # Transaction data access
│   └── UserRepository.java       # User data access
├── model/                         # Entity classes (Domain Layer)
│   ├── Role.java                 # Role entity
│   ├── Transaction.java          # Transaction entity
│   └── User.java                 # User entity
├── dto/                          # Data Transfer Objects
│   ├── TransactionDTO.java       # Transaction DTO
│   └── UserDTO.java              # User DTO
├── exception/                     # Exception handling
│   └── GlobalExceptionHandler.java # Global exception handler
└── util/                         # Utility classes (to be implemented)
```

---

## Layer Descriptions

### 1. Controller Layer (`controller/`)

**Purpose:** Handle HTTP requests and responses

**Responsibilities:**
- Receive incoming HTTP requests
- Validate request parameters
- Call appropriate service methods
- Format and return HTTP responses
- Handle REST API endpoints

**Example:**
```java
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    
    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getTransactions() {
        // Handle GET request
    }
}
```

**Key Points:**
- Uses `@RestController` annotation
- Should NOT contain business logic
- Returns DTOs, not entities
- Uses proper HTTP status codes

---

### 2. Service Layer (`service/`)

**Purpose:** Implement business logic and orchestrate operations

**Responsibilities:**
- Contain core business logic
- Coordinate between multiple repositories
- Handle transactions (@Transactional)
- Perform validation
- Convert between entities and DTOs
- Implement complex calculations

**Example:**
```java
@Service
@Transactional
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    
    public TransactionDTO createTransaction(TransactionDTO dto, User user) {
        // Business logic here
    }
}
```

**Key Points:**
- Uses `@Service` annotation
- Transaction management with `@Transactional`
- Should NOT depend on controllers
- Can depend on multiple repositories

---

### 3. Repository Layer (`repository/`)

**Purpose:** Abstract database operations

**Responsibilities:**
- Provide CRUD operations
- Define custom query methods
- Abstract database access
- Use Spring Data JPA

**Example:**
```java
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}
```

**Key Points:**
- Extends `JpaRepository`
- Interface-based (no implementation needed for basic CRUD)
- Can define custom queries
- Uses Spring Data JPA conventions

---

### 4. Model Layer (`model/`)

**Purpose:** Define database entities

**Responsibilities:**
- Map to database tables
- Define relationships between entities
- Contain persistence logic only
- Use JPA annotations

**Example:**
```java
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
```

**Key Points:**
- Uses `@Entity` annotation
- Should NOT contain business logic
- Defines relationships (@OneToMany, @ManyToOne, etc.)
- Includes audit fields (createdAt, updatedAt)

---

### 5. DTO Layer (`dto/`)

**Purpose:** Transfer data between layers

**Responsibilities:**
- Represent data for API responses/requests
- Exclude sensitive information (e.g., passwords)
- Provide validation annotations
- Decouple API from internal structure

**Example:**
```java
public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    // No password field!
}
```

**Key Points:**
- Plain Java classes (POJOs)
- Should NOT contain business logic
- Excludes sensitive data
- Can have different DTOs for different use cases

---

### 6. Configuration Layer (`config/`)

**Purpose:** Spring configuration classes

**Responsibilities:**
- Configure application beans
- Set up security (to be implemented)
- Configure CORS
- Database configuration
- External service configuration

**Current Files:**
- `WebConfig.java` - CORS configuration

**To Be Added:**
- `SecurityConfig.java` - Spring Security configuration
- `JwtConfig.java` - JWT authentication configuration
- `EmailConfig.java` - Email service configuration

---

### 7. Exception Layer (`exception/`)

**Purpose:** Centralized exception handling

**Responsibilities:**
- Handle all application exceptions
- Return consistent error responses
- Log errors appropriately
- Provide meaningful error messages

**Example:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        // Handle exception
    }
}
```

**To Be Added:**
- Custom exception classes
- Specific exception handlers
- Validation error handling

---

### 8. Utility Layer (`util/`)

**Purpose:** Helper and utility classes

**Planned Utilities:**
- `JwtUtil.java` - JWT token generation and validation
- `EmailUtil.java` - Email sending utilities
- `FileUtil.java` - File upload/download utilities
- `DateUtil.java` - Date/time helpers
- `ValidationUtil.java` - Custom validation logic

---

## Data Flow Example

### Creating a Transaction

```
1. Client → POST /api/transactions
                ↓
2. TransactionController.createTransaction()
                ↓
3. TransactionService.createTransaction()
   - Validates input
   - Converts DTO to Entity
   - Calls repository
                ↓
4. TransactionRepository.save()
   - Persists to database
                ↓
5. TransactionService
   - Converts Entity to DTO
   - Returns DTO
                ↓
6. TransactionController
   - Returns ResponseEntity<TransactionDTO>
                ↓
7. Client ← 201 CREATED with TransactionDTO
```

---

## Best Practices

### Controller Layer
- ✅ Keep controllers thin
- ✅ Use proper HTTP methods (GET, POST, PUT, DELETE)
- ✅ Return appropriate status codes
- ✅ Use DTOs, never expose entities
- ❌ Don't put business logic in controllers

### Service Layer
- ✅ Put all business logic here
- ✅ Use @Transactional for database operations
- ✅ Handle exceptions appropriately
- ✅ Convert between entities and DTOs
- ❌ Don't access HttpServletRequest/Response

### Repository Layer
- ✅ Use Spring Data JPA query methods
- ✅ Keep queries simple and focused
- ✅ Use custom queries when needed (@Query)
- ❌ Don't put business logic in repositories

### Model Layer
- ✅ Define clear relationships
- ✅ Use appropriate fetch types (LAZY vs EAGER)
- ✅ Implement audit fields
- ❌ Don't expose entities in API responses

---

## Security Considerations

### Current State
- No authentication/authorization implemented yet
- All endpoints are currently public

### To Be Implemented
1. **JWT Authentication**
   - Add SecurityConfig.java
   - Add JwtAuthenticationFilter
   - Protect endpoints with @PreAuthorize

2. **Password Security**
   - Use BCrypt for password hashing
   - Never store plain text passwords

3. **Role-Based Access Control**
   - Implement role checking
   - Admin vs User access levels

4. **Input Validation**
   - Add @Valid annotations
   - Validate all user input
   - Sanitize data

---

## Testing Strategy

### Unit Tests
- Test service layer logic
- Mock repository dependencies
- Test business rules

### Integration Tests
- Test controller endpoints
- Test database operations
- Test security configuration

### Repository Tests
- Test custom queries
- Test relationships
- Use @DataJpaTest

---

## Next Steps

1. **Implement Authentication**
   - Create SecurityConfig
   - Add JWT support
   - Implement login/register

2. **Complete CRUD Operations**
   - Finish TransactionService methods
   - Finish UserService methods
   - Implement update/delete operations

3. **Add Validation**
   - Add javax.validation annotations
   - Implement custom validators
   - Handle validation errors

4. **Add Testing**
   - Write unit tests for services
   - Write integration tests for controllers
   - Set up test database

5. **Implement Integrations**
   - Google OAuth
   - Email service
   - File uploads
   - Payment gateway

---

For implementation status, see [PROJECT_STATUS.md](PROJECT_STATUS.md)
