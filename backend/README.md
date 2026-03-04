# Centsibility Backend

Backend API for the Centsibility Financial Management Platform built with Spring Boot.

## Technologies Used

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA**
- **PostgreSQL / Supabase** (Database)
- **Maven** (Build tool)

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

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your database credentials:
```properties
# For Supabase (recommended)
DB_URL=jdbc:postgresql://your-project.pooler.supabase.com:5432/postgres
DB_USERNAME=postgres.yourprojectid
DB_PASSWORD=your_secure_password

# Or for local PostgreSQL
DB_URL=jdbc:postgresql://localhost:5432/centsibility
DB_USERNAME=postgres
DB_PASSWORD=your_local_password

# JWT Secret (change in production!)
JWT_SECRET=your_very_long_and_secure_secret_key_here
```

3. **For Supabase Users:**
   - Get credentials from: Project Settings → Database
   - Use the **Session Pooler** connection string for better IPv4 compatibility
   - Run the schema from `schema-postgres.sql` in the Supabase SQL Editor

4. **For Local PostgreSQL Users:**
   - Create database: `CREATE DATABASE centsibility;`
   - Run the schema: `psql -U postgres -d centsibility -f src/main/resources/schema-postgres.sql`

### Setting Environment Variables

#### Option 1: Using .env file (Recommended for development)
The `.env` file in the backend directory will be automatically loaded if you use an IDE plugin or tool like:
- IntelliJ IDEA: EnvFile plugin
- VS Code: DotENV extension
- Or use `export $(cat .env | xargs)` before running (Linux/Mac)

#### Option 2: System Environment Variables
Set environment variables in your system or IDE run configuration:
```bash
export DB_URL=jdbc:postgresql://...
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
```

#### Option 3: IntelliJ Run Configuration
1. Run → Edit Configurations
2. Add environment variables in the "Environment variables" field

### Running the Application

1. Install dependencies:
```bash
mvn clean install
```

2. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication

#### Register User
- **URL:** `POST /api/auth/register`
- **Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```
- **Response (201 Created):**
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

#### Login
- **URL:** `POST /api/auth/login`
- **Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```
- **Response (200 OK):**
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

## Security

- **Password Hashing:** BCrypt with 12 salt rounds
- **Authentication:** JWT (JSON Web Tokens)
- **Token Expiration:** 24 hours (configurable via `JWT_EXPIRATION`)
- **CORS:** Enabled for all origins (configure for production)
- **Environment Variables:** Sensitive credentials stored in `.env` (never committed to git)

### Security Best Practices

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Change default JWT_SECRET** - Generate a secure random string (64+ characters)
3. **Use strong database passwords** - Follow your database provider's recommendations
4. **Enable HTTPS in production** - Configure SSL/TLS certificates
5. **Restrict CORS origins** - Update SecurityConfig for production environment

## Features Implemented (Phase 1)

✅ User Registration
- First name, last name, email, and password
- Email format validation
- Password strength validation (min 8 chars, uppercase, lowercase, digit, special char)
- Duplicate email prevention
- BCrypt password hashing

✅ User Login
- Email and password authentication
- JWT token generation
- Spring Security integration
- Session management (stateless)

✅ Error Handling
- Global exception handler
- Validation errors
- Authentication errors
- Custom error responses

## Testing

Run tests:
```bash
mvn test
```

## Build for Production

```bash
mvn clean package
```

The JAR file will be created in the `target/` directory.
