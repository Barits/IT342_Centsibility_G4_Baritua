# Centsibility - Setup Guide

This guide will help you set up the Centsibility development environment on your local machine.

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
   - Verify installation: `java -version`

2. **Apache Maven 3.6+**
   - Download: [Maven](https://maven.apache.org/download.cgi)
   - Verify installation: `mvn -version`

3. **MySQL 8.0+**
   - Download: [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
   - Verify installation: `mysql --version`

4. **Node.js 16+ and npm**
   - Download: [Node.js](https://nodejs.org/)
   - Verify installation: `node -version` and `npm -version`

5. **Git**
   - Download: [Git](https://git-scm.com/downloads)
   - Verify installation: `git --version`

### Recommended Tools

- **IDE**: IntelliJ IDEA, VS Code, or Eclipse
- **Database Client**: MySQL Workbench, DBeaver, or DataGrip
- **API Testing**: Postman or Insomnia

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/IT342_Centsibility_Baritua.git
cd IT342_Centsibility_Baritua
```

---

## Step 2: Database Setup

### Create MySQL Database

1. Start MySQL server
2. Open MySQL command line or MySQL Workbench
3. Run the following commands:

```sql
CREATE DATABASE centsibility;

-- Optional: Create a dedicated user
CREATE USER 'centsibility_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON centsibility.* TO 'centsibility_user'@'localhost';
FLUSH PRIVILEGES;
```

### Verify Database Creation

```sql
SHOW DATABASES;
USE centsibility;
```

---

## Step 3: Backend Configuration

### Update application.properties

Navigate to `backend/src/main/resources/application.properties` and update:

```properties
# Database credentials
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# JWT Secret (generate a secure random string)
jwt.secret=your-256-bit-secret-key-here

# Email configuration (optional for now)
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### Generate JWT Secret

You can generate a secure JWT secret using online tools or:

```bash
# On Linux/Mac
openssl rand -base64 64

# Or use a random string generator
```

### Build the Backend

```bash
cd backend
mvn clean install
```

This will:
- Download all dependencies
- Compile the code
- Run tests
- Create a JAR file in `target/`

**Note:** Initial build may take 5-10 minutes as Maven downloads dependencies.

---

## Step 4: Frontend Configuration

### Install Dependencies

```bash
cd web
npm install
```

This will install all React dependencies listed in `package.json`.

### Verify Proxy Configuration

Check that `web/package.json` has:

```json
"proxy": "http://localhost:8080"
```

This allows the React app to communicate with the Spring Boot backend.

---

## Step 5: Running the Application

### Start Backend Server

Open a terminal in the `backend/` directory:

```bash
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

You should see:
```
Started BackendApplication in X.XXX seconds
```

### Start Frontend Development Server

Open another terminal in the `web/` directory:

```bash
npm start
```

The React app will open automatically in your browser at **http://localhost:3000**

---

## Step 6: Verify Installation

### Check Backend

1. Backend running: http://localhost:8080
2. Check console for any errors
3. Database tables should be auto-created by Hibernate

### Check Frontend

1. Frontend running: http://localhost:3000
2. React app loads without errors
3. Check browser console for any warnings

### Test API Connection

Once endpoints are implemented, you can test with curl:

```bash
# Example (when implemented)
curl http://localhost:8080/api/health
```

---

## Common Issues and Solutions

### Issue: Maven not found

**Error:** `mvn: command not found`

**Solution:**
1. Install Maven from https://maven.apache.org/download.cgi
2. Add Maven to your PATH environment variable
3. Restart terminal and verify: `mvn -version`

### Issue: MySQL connection refused

**Error:** `Communications link failure`

**Solution:**
1. Ensure MySQL server is running
2. Verify credentials in `application.properties`
3. Check MySQL is listening on port 3306: `netstat -an | grep 3306`

### Issue: Port already in use

**Error:** `Port 8080 is already in use`

**Solution:**
1. Stop the process using port 8080
2. Or change the port in `application.properties`: `server.port=8081`

### Issue: React app won't start

**Error:** Various npm errors

**Solution:**
1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Clear npm cache: `npm cache clean --force`

### Issue: Database tables not created

**Solution:**
1. Check `application.properties`: `spring.jpa.hibernate.ddl-auto=update`
2. Verify database connection
3. Check backend console for Hibernate SQL logs

---

## Next Steps

Now that your environment is set up, you can:

1. **Review the Code Structure**
   - Explore the layered architecture (Controller-Service-Repository)
   - Review entity models in `backend/src/main/java/com/centsibility/backend/model/`
   - Check DTOs, repositories, services, and controllers

2. **Start Development**
   - See [PROJECT_STATUS.md](PROJECT_STATUS.md) for current tasks
   - Pick a TODO from the template files and implement it
   - Start with simple features (e.g., basic CRUD operations)

3. **Learn the Stack**
   - Spring Boot Documentation: https://spring.io/projects/spring-boot
   - React Documentation: https://react.dev/
   - Spring Security & JWT tutorials
   - Hibernate/JPA documentation

4. **Set Up Your IDE**
   - Import the backend project as a Maven project
   - Configure code formatting and linting
   - Set up debugging configurations

---

## Development Workflow

### Making Changes

1. Create a new branch for your feature
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make your changes in the appropriate layer
   - Models: Database entities
   - Repositories: Data access
   - Services: Business logic
   - Controllers: REST endpoints
   - DTOs: Data transfer objects

3. Test your changes locally

4. Commit and push
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   git push origin feature/feature-name
   ```

### Running Tests

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd web
npm test
```

---

## Additional Configuration

### Email (SMTP)

For email verification and notifications, configure Gmail SMTP:

1. Enable 2-factor authentication on your Google account
2. Generate an App Password
3. Update `application.properties` with your credentials

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Update `application.properties` with client ID and secret

### Payment Gateway (Sandbox)

Choose a payment provider (Stripe, PayPal, etc.) and:

1. Sign up for a developer account
2. Get sandbox/test API keys
3. Update `application.properties` with credentials
4. Never commit real API keys to version control

---

## Getting Help

- **Documentation:** See `documents/` folder
- **Project Status:** [PROJECT_STATUS.md](PROJECT_STATUS.md)
- **Issues:** Check existing issues or create a new one
- **Team Communication:** [Your team communication channel]

---

**Happy Coding! 🚀**
