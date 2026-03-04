# Backend Setup Guide

## Prerequisites

- Java 17 or higher
- Maven 3.x
- MySQL 8.0
- IDE (IntelliJ IDEA, Eclipse, or VS Code with Java extensions)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Centsibility/backend
```

### 2. Configure MySQL Database

Create a MySQL database:

```sql
CREATE DATABASE centsibility;
```

Or use the provided schema:

```bash
mysql -u root -p < ../docs/database/schema.sql
```

### 3. Configure Application Properties

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/centsibility
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

jwt.secret=your_secure_jwt_secret_key_min_32_chars
jwt.expiration=86400000

spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### 4. Install Dependencies

```bash
mvn clean install
```

### 5. Run the Application

```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## Development Profile

To run with development profile:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Build for Production

```bash
mvn clean package
java -jar target/centsibility-backend-1.0.0.jar --spring.profiles.active=prod
```

## Testing

Run tests:

```bash
mvn test
```

## API Documentation

Once running, access:
- Swagger UI: `http://localhost:8080/swagger-ui.html` (if configured)
- API Docs: See `/docs/api/` folder

## Troubleshooting

### Port 8080 already in use

Change the port in `application.properties`:
```properties
server.port=8081
```

### Database connection issues

1. Verify MySQL is running
2. Check connection credentials
3. Ensure database exists

### Email sending issues

1. Use Gmail App Password instead of regular password
2. Enable "Less secure app access" (not recommended for production)
3. Or use a different SMTP provider
