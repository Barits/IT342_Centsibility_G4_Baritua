# Environment Variables Guide

## Backend Environment Variables

Configure in `backend/src/main/resources/application.properties`:

### Server Configuration
```properties
server.port=8080
```

### Database Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/centsibility
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### JPA/Hibernate Configuration
```properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### JWT Configuration
```properties
jwt.secret=your_jwt_secret_key_here_minimum_32_characters_long
jwt.expiration=86400000
jwt.refresh.expiration=604800000
```

⚠️ **Important:** Use a strong, random secret key for production!

### File Storage
```properties
file.upload-dir=./uploads
file.max-size=10485760
```

### Email Configuration (Gmail)
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_gmail_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

**Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)

### Logging
```properties
logging.level.org.springframework.security=DEBUG
logging.level.com.centsibility=DEBUG
```

---

## Web Frontend Environment Variables

Configure in `web/.env.local`:

### API Configuration
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Application Settings
```env
VITE_APP_NAME=Centsibility
VITE_MAX_FILE_SIZE=10485760
```

### Optional: OAuth
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Production Recommendations

### Backend (Production Profile)

Create `application-prod.properties`:

```properties
# Use environment variables for sensitive data
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

jwt.secret=${JWT_SECRET}

spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}

# Disable SQL logging
spring.jpa.show-sql=false
logging.level.org.springframework.security=WARN
```

Set environment variables on your server:
```bash
export DB_URL=jdbc:mysql://production-db:3306/centsibility
export DB_USERNAME=prod_user
export DB_PASSWORD=secure_password
export JWT_SECRET=very_long_random_secret_key
export MAIL_USERNAME=noreply@centsibility.com
export MAIL_PASSWORD=secure_mail_password
```

### Web Frontend (Production)

Set environment variables in your deployment platform (Netlify, Vercel, etc.):

```env
VITE_API_BASE_URL=https://api.centsibility.com/api
VITE_APP_NAME=Centsibility
```

---

## Security Best Practices

1. **Never commit sensitive data** to version control
2. Use `.env.local` for local development (already in `.gitignore`)
3. Use strong, randomly generated secrets for JWT
4. Rotate secrets periodically
5. Use environment-specific configuration files
6. Use secret management tools in production (AWS Secrets Manager, HashiCorp Vault, etc.)
