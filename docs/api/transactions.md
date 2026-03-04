# Transactions API Documentation

Base URL: `http://localhost:8080/api/transactions`

**Authentication Required:** All endpoints require Bearer token

## Endpoints

### 1. Create Transaction

**POST** `/`

Create a new transaction.

**Request Body:**
```json
{
  "type": "EXPENSE",
  "amount": 1500.00,
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "transactionDate": "2026-03-04",
  "paymentMethod": "CASH",
  "tags": "restaurant,lunch"
}
```

**Response:**
```json
{
  "id": 1,
  "type": "EXPENSE",
  "amount": 1500.00,
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "transactionDate": "2026-03-04",
  "paymentMethod": "CASH",
  "receiptUrl": null,
  "tags": "restaurant,lunch",
  "createdAt": "2026-03-04T12:30:00",
  "updatedAt": "2026-03-04T12:30:00"
}
```

### 2. Get All Transactions

**GET** `/`

Get all transactions for the authenticated user.

**Response:**
```json
[
  {
    "id": 1,
    "type": "EXPENSE",
    "amount": 1500.00,
    "category": "Food & Dining",
    "transactionDate": "2026-03-04",
    ...
  }
]
```

### 3. Get Transaction by ID

**GET** `/{id}`

Get a specific transaction by ID.

### 4. Get Transactions by Date Range

**GET** `/date-range?startDate={startDate}&endDate={endDate}`

### 5. Get Transactions by Type

**GET** `/type/{type}`

Type values: `INCOME`, `EXPENSE`

### 6. Get Transactions by Category

**GET** `/category/{category}`

### 7. Update Transaction

**PUT** `/{id}`

Update an existing transaction.

### 8. Delete Transaction

**DELETE** `/{id}`

Delete a transaction.
