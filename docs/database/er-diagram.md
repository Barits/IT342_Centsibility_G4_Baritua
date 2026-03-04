# Centsibility Database ER Diagram

## Entity Relationship Overview

```
┌─────────────┐              ┌──────────────┐
│    USERS    │──────────────│  USER_ROLES  │
└─────────────┘              └──────────────┘
      │                              │
      │                              │
      │                      ┌──────────────┐
      │                      │    ROLES     │
      │                      └──────────────┘
      │
      ├──────────────────────┐
      │                      │
      ▼                      ▼
┌───────────────┐    ┌────────────────┐
│ TRANSACTIONS  │    │    BUDGETS     │
└───────────────┘    └────────────────┘
```

## Tables

### USERS
Primary table for user accounts
- id (PK)
- username (UNIQUE)
- email (UNIQUE)
- password
- first_name
- last_name
- phone_number
- email_verified
- verification_token
- is_active
- created_at
- updated_at

### ROLES
Pre-defined user roles
- id (PK)
- name (UNIQUE) - ROLE_USER, ROLE_ADMIN

### USER_ROLES
Many-to-many relationship between users and roles
- user_id (FK → users.id)
- role_id (FK → roles.id)

### TRANSACTIONS
User financial transactions
- id (PK)
- user_id (FK → users.id)
- type (INCOME/EXPENSE)
- amount
- category
- description
- transaction_date
- payment_method
- receipt_url
- tags
- created_at
- updated_at

### BUDGETS
User budget goals
- id (PK)
- user_id (FK → users.id)
- category
- budget_limit
- current_spent
- start_date
- end_date
- period
- alert_enabled
- alert_threshold
- created_at
- updated_at

## Relationships

1. **Users ↔ Roles** (Many-to-Many)
   - Through USER_ROLES junction table
   - A user can have multiple roles
   - A role can be assigned to multiple users

2. **Users → Transactions** (One-to-Many)
   - Each transaction belongs to one user
   - A user can have multiple transactions
   - CASCADE delete: deleting user deletes all transactions

3. **Users → Budgets** (One-to-Many)
   - Each budget belongs to one user
   - A user can have multiple budgets
   - CASCADE delete: deleting user deletes all budgets
