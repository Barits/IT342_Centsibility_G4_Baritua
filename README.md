# Centsibility - Personal Finance Management Platform

A comprehensive financial management platform designed to simplify personal accounting for students and young professionals. Track income, expenses, set budget goals, and gain financial insights.

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-green)
![React](https://img.shields.io/badge/React-18+-blue)

## 🏗️ Architecture

Three-tier architecture:
- **Backend**: Spring Boot REST API with Spring Security & JWT
- **Frontend**: React JS Web Application with Redux Toolkit
- **Database**: MySQL 8.0

## ✨ Features

- 🔐 User Authentication & Authorization (JWT)
- 💰 Transaction Management (Income/Expense tracking)
- 📊 Budget Goals & Monitoring
- 📈 Financial Dashboard with Charts
- 👨‍💼 Admin Panel for User Management
- 📁 File Uploads (Receipts)
- 📧 Email Notifications
- 🔍 Advanced Filtering & Search
- 📱 Responsive Design

## 📋 Prerequisites

- **Java 17+**
- **Node.js 18+**
- **MySQL 8.0**
- **Maven 3.x**
- **npm or yarn**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Centsibility
```

### 2. Setup MySQL Database

```bash
mysql -u root -p < docs/database/schema.sql
```

Or manually create the database:
```sql
CREATE DATABASE centsibility;
```

### 3. Backend Setup

```bash
cd backend

# Configure database credentials in src/main/resources/application.properties

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

Backend API will be available at `http://localhost:8080`

### 4. Web Frontend Setup

```bash
cd web

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Web application will be available at `http://localhost:5173`

## 📁 Project Structure

```
Centsibility/
├── backend/              # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/centsibility/
│   │   │   │   ├── config/          # Security & configuration
│   │   │   │   ├── controller/      # REST endpoints
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── repository/      # Data access
│   │   │   │   ├── model/           # Entity classes
│   │   │   │   ├── dto/             # Data transfer objects
│   │   │   │   ├── security/        # JWT utilities
│   │   │   │   └── exception/       # Exception handling
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── web/                  # React application
│   ├── src/
│   │   ├── assets/              # Static assets
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── store/               # Redux store
│   │   ├── hooks/               # Custom hooks
│   │   ├── utils/               # Utility functions
│   │   └── routes/              # Route configuration
│   └── package.json
│
├── docs/                 # Documentation
│   ├── api/              # API documentation
│   ├── database/         # Database schema & queries
│   └── setup/            # Setup guides
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/centsibility
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret=your_secure_secret_key_minimum_32_characters
jwt.expiration=86400000

# Email
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### Frontend Configuration

Edit `web/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Centsibility
```

## 📚 API Documentation

API documentation is available in the `/docs/api/` directory:
- [Authentication API](docs/api/authentication.md)
- [Transactions API](docs/api/transactions.md)
- [Budgets API](docs/api/budgets.md)

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd web
npm test
```

## 🐳 Docker Support

Start the MySQL database using Docker:

```bash
docker-compose up -d
```

## 📖 Documentation

- [Backend Setup Guide](docs/setup/backend-setup.md)
- [Web Setup Guide](docs/setup/web-setup.md)
- [Environment Variables](docs/setup/environment-variables.md)
- [Database Schema](docs/database/schema.sql)
- [ER Diagram](docs/database/er-diagram.md)

## 🛠️ Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.2
- Spring Security with JWT
- Spring Data JPA
- MySQL 8.0
- Maven
- Lombok

### Frontend
- React 18+
- Vite
- Redux Toolkit
- React Router v6
- Material-UI (MUI)
- Axios
- Formik & Yup
- Recharts

## 🚦 Application Status

### Implemented Features
✅ Project Structure Setup  
✅ User Authentication (Register/Login)  
✅ Email Verification  
✅ Transaction CRUD Operations  
✅ Budget Management  
✅ File Upload Support  
✅ API Documentation  

### In Progress
🔄 Dashboard with Charts  
🔄 Advanced Filtering  
🔄 Admin Panel  

### Planned
📋 Mobile Application  
📋 Budget Alerts & Notifications  
📋 Expense Analytics  
📋 Export to PDF/Excel  
📋 Multi-currency Support  

## 📝 License

MIT License

## 👥 Contributors

- **Baritua, Carl Gabriel C.** - Project Lead & Developer

## 📧 Contact

For questions or support, please contact the development team.

---

**Centsibility** - Making Cents of Your Money 💰
