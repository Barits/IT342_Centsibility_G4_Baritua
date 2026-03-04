# Budgets API Documentation

Base URL: `http://localhost:8080/api/budgets`

**Authentication Required:** All endpoints require Bearer token

## Endpoints

### 1. Create Budget

**POST** `/`

Create a new budget.

**Request Body:**
```json
{
  "category": "Food & Dining",
  "budgetLimit": 10000.00,
  "startDate": "2026-03-01",
  "endDate": "2026-03-31",
  "period": "MONTHLY",
  "alertEnabled": true,
  "alertThreshold": 80.00
}
```

**Response:**
```json
{
  "id": 1,
  "category": "Food & Dining",
  "budgetLimit": 10000.00,
  "currentSpent": 0.00,
  "startDate": "2026-03-01",
  "endDate": "2026-03-31",
  "period": "MONTHLY",
  "alertEnabled": true,
  "alertThreshold": 80.00,
  "percentageUsed": 0.00,
  "createdAt": "2026-03-04T12:30:00",
  "updatedAt": "2026-03-04T12:30:00"
}
```

### 2. Get All Budgets

**GET** `/`

Get all budgets for the authenticated user.

### 3. Get Active Budgets

**GET** `/active`

Get only active budgets (current date within start and end date).

### 4. Get Budget by ID

**GET** `/{id}`

### 5. Get Budgets by Category

**GET** `/category/{category}`

### 6. Update Budget

**PUT** `/{id}`

### 7. Delete Budget

**DELETE** `/{id}`

## Budget Periods

- `DAILY`
- `WEEKLY`
- `MONTHLY`
- `QUARTERLY`
- `YEARLY`
- `CUSTOM`
